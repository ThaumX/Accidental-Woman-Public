
#!/bin/bash
if [ ! -d ".git" ]; then
	#not running in git repo, so can't use git commands :-)
	echo "No .git repo found - skipping sanity checks"
	exit 0
fi

WARNING='\033[93m'
WARNING='\033[93m'
ENDC='\033[0m'

myprint() {
	while read data; do
		echo -n -e "[$1]$WARNING"
		echo "$data"
	done
}

GREP="git grep -n --color"
# Check for missing right angle bracket: <</if>
$GREP "<</[^>]*>[^>]" -- 'src/*'  | myprint "MissingClosingAngleBracket"
$GREP "<<[^>()]*>[^()<>"$'\r]*\r'"\?$" -- 'src/*' | myprint "MissingClosingAngleBracket"
# Check for missing left angle bracket: </if>>
$GREP "\([^<]\|^\)</\?\(if\|else\|case\|set\|print\|elseif\)" -- 'src/*' | myprint "MissingOpeningAngleBracket2"
# Check for accidental assignment.  e.g.:   <<if $foo = "hello">>
$GREP "<<[ ]*if[^>=]*[^><\!=]=[^=][^>]*>>" -- 'src/*' | myprint "AccidentalAssignmentInIf"
# Check for accidental assignment.  e.g.:   <<elseif $foo = "hello">>
$GREP "<<[ ]*elseif[^>=]*[^><\!=]=[^=][^>]*>>" -- 'src/*' | myprint "AccidentalAssignmentInElseIf"
# Check for missing ".  e.g.:   <<if $foo == "hello>>
$GREP "<<[^\"<>]*\"[^\"<>]*>>" -- 'src/*' | myprint "MissingSpeachMark"
# Check for missing ".  e.g.:   <<if $foo = "hello)
$GREP "<<[^\"<>]*\([^\"<>]*\"[^><\"]*\"\| [<>] \)*\"\([^\"<>]*\"[^><\"]*\"\| [<>] \)*\([^\"<>]\| [<>] \)*>>" -- 'src/*' | myprint "MissingSpeachMark2"
# Check for colors like: @@color:red   - should be @@.red
$GREP -e "@@color:" --and --not -e  "@@color:rgb([0-9 ]\+,[0-9 ]\+,[0-9 ]\+)" -- "src/*" | myprint "UseCssColors"
# Check for missing $ in activeSlave or PC
$GREP "<<[ ]*[^\$><_\[]*\(activeNPC\|PC\)[.]"  -- "src/*" | myprint "MissingDollar"
# Check for closing bracket without opening bracket.  e.g.:  <<if foo)>>      (but  <<case "foo")>>   is valid, so ignore those
$GREP -e "<<[ a-zA-Z]\+\([^()<>]\|[^()<>][<>][^()<>]\)*)" --and --not -e "<< *case"  -- "src/*" | myprint "MissingOpeningBracket"
# Check for opening bracket without closing bracket.  e.g.:  <<if (foo>>
$GREP -e "<<[ a-zA-Z]\([^<>]\|[^<>][<>][^<>]\)\+(\([^()<>]\|[^<>()][<>][^<>()]\|([^<>()]*])\)*>>" -- "src/*" | myprint "MissingClosingBracket"
# Check for two closing brackets but one opening bracket.  e.g.:  <<if (foo))>>
$GREP -e "<<[ a-zA-Z]\+[^()<>]*([^()]*)[^()]*)[^()<>]*>>"  -- "src/*" | myprint "MissingOpeningBracket2"
# Check for one closing bracket but two opening brackets.  e.g.:  <<if ((foo)>>
$GREP -e "<<[ a-zA-Z]\+[^()<>]*([^()]*([^()]*)[^()<>]*>>"  -- "src/*" | myprint "MissingClosingBracket2"
$GREP -e "<<.*[(][^<>)]*[(][^<>)]*)\?[^<>)]*>>" -- "src/*" | myprint "MissingClosingBracket3"
# Check for missing >>.  e.g.:   <<if $foo
$GREP "<<[^<>]*[^,\"\[{"$'\r]\r'"\?$" -- 'src/*' | myprint "MissingClosingAngleBrackets"
# Check for too many >>>.  e.g.: <</if>>> 
$GREP "<<[^<>]*[<>]\?[^<>]*>>>" -- "src/*.tw" | myprint "TooManyAngleBrackets"
# Check for too many <<<.  e.g.: <<</if>> 
$GREP "<<<[^<>]*[<>]\?[^<>]*>>" -- "src/*.tw" | myprint "TooManyAngleBrackets"
# Check for wrong capitalization on 'activeslave' and other common typos
#$GREP -e "\$act" --and --not -e "\$\(activeSlave\|activeArcology\|activeStandard\|activeOrgan\|activeLimbs\)" -- "src/*" | myprint "WrongCapitilization"
$GREP  "\(csae\|[a-z] She \|attepmts\|youreslf\|advnaces\)" -- 'src/*' | myprint "SpellCheck"
$GREP "\$slave\[" -- 'src/*' | myprint "ShouldBeSlaves"
# Check for strange spaces e.g.  $NPC[$i]. balls
$GREP "\$NPC\[\$i\]\. " -- 'src/*' | myprint "MissingPropertyAfterNPC"
# Check for strange spaces e.g.  $PC. tits
$GREP "\$PC\. " -- 'src/*' | myprint "MissingPropertyAfterPC"
# Check, e.g., <<//if>>
$GREP "<</[a-zA-Z]*[^a-zA-Z<>]\+[a-zA-Z]*>>" -- 'src/*' | myprint "DoubleSlash"
# Check, e.g.  <<else $foo==4
$GREP "<<else >\?[^>]" -- 'src/*' | myprint "ShouldBeElseIf"
# Check, e.g., =to
$GREP "=to" -- 'src/*' | myprint "EqualAndTo"
# Check doing  $slaves.foo instead of $slaves[i].foo
$GREP -e "[$]NPC[.]"  --and --not -e '[$]NPC[.]\(length\|random\|map\|filter\|deleteAt\|push\|find\|includes\|delete\|forEach\)' -- 'src/*' | myprint "MissingSlavesIndex"
# Try to check for accidentally mixing slaves[] and activeSlave.  This can have a lot of false matches, but has caught a lot of bugs so it's worth the pain
$GREP -e "activeNPC[.]" --and -e "NPC\[..\?\][.]" --and --not -e '[.]ID' --and --not -e 'slaves\[..\?\][.]\(slaveName\|slaveSurname\|actualAge\|relation\|assignment\|age\|devotion\|trust\|vagina\|mother\|father\)' -- 'src/*' | myprint "MaybeAccidentalMixingOfSlavesAndActiveSlave"
# Check, e.g.  <<set foo == 4>>
$GREP "<<set[^{>=]*==" -- 'src/*' | myprint "DoubleEqualsInSet"
# Check for, e.g   <<if slaves[foo]>>
$GREP "<<\([^>]\|[^>]>[^>]\)*[^$]NPC\[" -- 'src/*' | myprint "MissingDollar"
# Check for missing $ or _ in variable name:
$GREP -e "<<[a-zA-Z]\([^>\"]\|[^>]>[^>]\|\"[^\"]*\"\)* [a-zA-Z]\+ * =" -- src/*.tw | myprint "MissingDollar2"
# Check for missing command, e.g.  <<foo =
$GREP -e "<<[a-zA-Z]* = *" -- src/*.tw | myprint "BadCommand"
# Check for duplicate words, e.g. with with
$GREP -e  " \(\b[a-zA-Z][a-zA-Z]\+\) \1\b " --and --not -e " her her " --and --not -e " you you " --and --not -e " New New " --and --not -e " that that " --and --not -e " in in " --and --not -e " is is " -- 'src/*' | myprint "Duplicate words"
# Check for obsolete SugarCube macros
$GREP -E "<<display|<<click|<<.*\.contains" -- src/*.tw | myprint "ObsoleteMacro" 
# Check for double articles
$GREP -E "\Wa an\W" -- src/*.tw | myprint "DoubleArticle"
# Check for incorrect articles
$GREP -i -E "\Wa (a|e|i|o|u)." -- src/*.tw | grep -i -vE "\Wa (un|eu|us|ut|on|ur|in)." | grep -i -vE "(&|<<s>>|UM)." | myprint "IncorrectArticle"
$GREP -i -E "\Wan (b|c|d|f|g|j|k|l|m|n|p|q|r|s|t|v|w|x|y|z)\w." -- src/*.tw | grep -i -vE "[A-Z]{3}" | myprint "IncorrectArticle"
# Check for $ sign mid-word
$GREP -i "\w$\w" -- src/*.tw | myprint "VarSignMidWord"
# Check that we do not have any variables that we use only once.   e.g.     $onlyUsedOnce
# Ignore  *Nationalities
(
cd src/
cat $(find . -name "*.tw" ) | tr -c '$a-zA-Z' '\n'  | sed -n '/^[$]/p' | grep -v "Nationalities" | sort | uniq -u | sed 's/^[$]/-e[$]/' | sed 's/$/\\\\W/' | xargs -r  git grep -n --color | myprint "OnlyUsedOnce"
cat $(find . -name "*.tw" ) | tr -c '.$a-zA-Z[]_' '\n' | sed -n -e 's/^[$]\(PC\|activeNPC\|\(NPC\|tanks\)\[[^]]*\]*\)[.]\([a-zA-Z]*\).*$/[.]\3/p' | sort | uniq -u |sed 's/^\(.*\)$/-e\1\\\\\b/'  | xargs -r git grep -n --color | myprint "AttributeOnlyUsedOnce"
)
# Check that all the tags are properly opened and closed
git ls-files "src/*.tw" | xargs -d '\n' ./devTools/check.py
Contact GitHub API Training Shop Blog About
© 2017 GitHub, Inc. Terms Privacy Security Status Help
read