breakfast  → protein "with" breakfast "on the side" ;
breakfast  → protein ;
breakfast  → bread ;

protein    → crispiness "crispy" "bacon" ;
protein    → "sausage" ;
protein    → cooked "eggs" ;

crispiness → "really" ;
crispiness → "really" crispiness ;

cooked     → "scrambled" ;
cooked     → "poached" ;
cooked     → "fried" ;

bread      → "toast" ;
bread      → "biscuits" ;
bread      → "English muffin" ;

SHORT SYNTAX - DRAFT 1
---
breakfast  -> protein "with" breakfast "on the side" | protein | bread
protein    -> crispiness "crispy" "bacon"| "sausage" | cooked "eggs"
crispiness -> "really"+
cooked     -> "scrambeld" | "poached" | "fried"
bread      -> "toast" | "biscuits" | "English muffin"

SHORT SYNTAX - DRAFT 2
---
breakfast  -> protein ("with" breakfast "on the side")? | bread
protein    -> "really"+ "crispy" "bacon" | "sausage" | cooked "eggs"
cooked     -> "scrambeld" | "poached" | "fried"
bread      -> "toast" | "biscuits" | "English muffin"



-->
Rules for arithemetic expressoins (focus on RHS only)
const a = 3;          -> token=Number
const a = 4;          -> token=Number
const a = 3 + 4;      -> token=number operator number
const x = -3;         -> token=operator number
const x = a * 4;      -> token=expression operator number
const x = a * b;      -> token=expression operator expression
const y = 3 == 3;     -> token=number operator number
const z = "dfdfdfdf"; -> token=String
const z = true;       -> token=true
const y = false;      -> token=false
const y = !false;      -> token=operator false
const y = null;      -> token=nil
Lox Grammar Rules
---
literal  -> Number | String | "true" | "false" | "nil"
operator -> "==" | "!=" | "<" | "<=" | ">" | ">=" | "+"  | "-"  | "*" | "/" 
unary    -> ("-"|"!") expression
grouping -> "(" expression ")"
binary   -> expression operator expression
expresion -> literal | unary | binary | grouping