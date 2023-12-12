(self.webpackChunkgutenberg=self.webpackChunkgutenberg||[]).push([[6783,3137,628,7324,8162],{"./node_modules/sprintf-js/src/sprintf.js":function(module,exports,__webpack_require__){var __WEBPACK_AMD_DEFINE_RESULT__;!function(){"use strict";var re={not_string:/[^s]/,not_bool:/[^t]/,not_type:/[^T]/,not_primitive:/[^v]/,number:/[diefg]/,numeric_arg:/[bcdiefguxX]/,json:/[j]/,not_json:/[^j]/,text:/^[^\x25]+/,modulo:/^\x25{2}/,placeholder:/^\x25(?:([1-9]\d*)\$|\(([^\)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-gijostTuvxX])/,key:/^([a-z_][a-z_\d]*)/i,key_access:/^\.([a-z_][a-z_\d]*)/i,index_access:/^\[(\d+)\]/,sign:/^[\+\-]/};function sprintf(key){return function sprintf_format(parse_tree,argv){var arg,i,k,match,pad,pad_character,pad_length,is_positive,sign,cursor=1,tree_length=parse_tree.length,output="";for(i=0;i<tree_length;i++)if("string"==typeof parse_tree[i])output+=parse_tree[i];else if(Array.isArray(parse_tree[i])){if((match=parse_tree[i])[2])for(arg=argv[cursor],k=0;k<match[2].length;k++){if(!arg.hasOwnProperty(match[2][k]))throw new Error(sprintf('[sprintf] property "%s" does not exist',match[2][k]));arg=arg[match[2][k]]}else arg=match[1]?argv[match[1]]:argv[cursor++];if(re.not_type.test(match[8])&&re.not_primitive.test(match[8])&&arg instanceof Function&&(arg=arg()),re.numeric_arg.test(match[8])&&"number"!=typeof arg&&isNaN(arg))throw new TypeError(sprintf("[sprintf] expecting number but found %T",arg));switch(re.number.test(match[8])&&(is_positive=arg>=0),match[8]){case"b":arg=parseInt(arg,10).toString(2);break;case"c":arg=String.fromCharCode(parseInt(arg,10));break;case"d":case"i":arg=parseInt(arg,10);break;case"j":arg=JSON.stringify(arg,null,match[6]?parseInt(match[6]):0);break;case"e":arg=match[7]?parseFloat(arg).toExponential(match[7]):parseFloat(arg).toExponential();break;case"f":arg=match[7]?parseFloat(arg).toFixed(match[7]):parseFloat(arg);break;case"g":arg=match[7]?String(Number(arg.toPrecision(match[7]))):parseFloat(arg);break;case"o":arg=(parseInt(arg,10)>>>0).toString(8);break;case"s":arg=String(arg),arg=match[7]?arg.substring(0,match[7]):arg;break;case"t":arg=String(!!arg),arg=match[7]?arg.substring(0,match[7]):arg;break;case"T":arg=Object.prototype.toString.call(arg).slice(8,-1).toLowerCase(),arg=match[7]?arg.substring(0,match[7]):arg;break;case"u":arg=parseInt(arg,10)>>>0;break;case"v":arg=arg.valueOf(),arg=match[7]?arg.substring(0,match[7]):arg;break;case"x":arg=(parseInt(arg,10)>>>0).toString(16);break;case"X":arg=(parseInt(arg,10)>>>0).toString(16).toUpperCase()}re.json.test(match[8])?output+=arg:(!re.number.test(match[8])||is_positive&&!match[3]?sign="":(sign=is_positive?"+":"-",arg=arg.toString().replace(re.sign,"")),pad_character=match[4]?"0"===match[4]?"0":match[4].charAt(1):" ",pad_length=match[6]-(sign+arg).length,pad=match[6]&&pad_length>0?pad_character.repeat(pad_length):"",output+=match[5]?sign+arg+pad:"0"===pad_character?sign+pad+arg:pad+sign+arg)}return output}(function sprintf_parse(fmt){if(sprintf_cache[fmt])return sprintf_cache[fmt];var match,_fmt=fmt,parse_tree=[],arg_names=0;for(;_fmt;){if(null!==(match=re.text.exec(_fmt)))parse_tree.push(match[0]);else if(null!==(match=re.modulo.exec(_fmt)))parse_tree.push("%");else{if(null===(match=re.placeholder.exec(_fmt)))throw new SyntaxError("[sprintf] unexpected placeholder");if(match[2]){arg_names|=1;var field_list=[],replacement_field=match[2],field_match=[];if(null===(field_match=re.key.exec(replacement_field)))throw new SyntaxError("[sprintf] failed to parse named argument key");for(field_list.push(field_match[1]);""!==(replacement_field=replacement_field.substring(field_match[0].length));)if(null!==(field_match=re.key_access.exec(replacement_field)))field_list.push(field_match[1]);else{if(null===(field_match=re.index_access.exec(replacement_field)))throw new SyntaxError("[sprintf] failed to parse named argument key");field_list.push(field_match[1])}match[2]=field_list}else arg_names|=2;if(3===arg_names)throw new Error("[sprintf] mixing positional and named placeholders is not (yet) supported");parse_tree.push(match)}_fmt=_fmt.substring(match[0].length)}return sprintf_cache[fmt]=parse_tree}(key),arguments)}function vsprintf(fmt,argv){return sprintf.apply(null,[fmt].concat(argv||[]))}var sprintf_cache=Object.create(null);exports.sprintf=sprintf,exports.vsprintf=vsprintf,"undefined"!=typeof window&&(window.sprintf=sprintf,window.vsprintf=vsprintf,void 0===(__WEBPACK_AMD_DEFINE_RESULT__=function(){return{sprintf:sprintf,vsprintf:vsprintf}}.call(exports,__webpack_require__,exports,module))||(module.exports=__WEBPACK_AMD_DEFINE_RESULT__))}()},"./node_modules/tannin/index.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){"use strict";var PRECEDENCE,OPENERS,TERMINATORS,PATTERN;__webpack_require__.d(__webpack_exports__,{Z:function(){return Tannin}}),PRECEDENCE={"(":9,"!":8,"*":7,"/":7,"%":7,"+":6,"-":6,"<":5,"<=":5,">":5,">=":5,"==":4,"!=":4,"&&":3,"||":2,"?":1,"?:":1},OPENERS=["(","?"],TERMINATORS={")":["("],":":["?","?:"]},PATTERN=/<=|>=|==|!=|&&|\|\||\?:|\(|!|\*|\/|%|\+|-|<|>|\?|\)|:/;var OPERATORS={"!":function(a){return!a},"*":function(a,b){return a*b},"/":function(a,b){return a/b},"%":function(a,b){return a%b},"+":function(a,b){return a+b},"-":function(a,b){return a-b},"<":function(a,b){return a<b},"<=":function(a,b){return a<=b},">":function(a,b){return a>b},">=":function(a,b){return a>=b},"==":function(a,b){return a===b},"!=":function(a,b){return a!==b},"&&":function(a,b){return a&&b},"||":function(a,b){return a||b},"?:":function(a,b,c){if(a)throw b;return c}};function compile(expression){var terms=function postfix(expression){for(var match,operator,term,element,terms=[],stack=[];match=expression.match(PATTERN);){for(operator=match[0],(term=expression.substr(0,match.index).trim())&&terms.push(term);element=stack.pop();){if(TERMINATORS[operator]){if(TERMINATORS[operator][0]===element){operator=TERMINATORS[operator][1]||operator;break}}else if(OPENERS.indexOf(element)>=0||PRECEDENCE[element]<PRECEDENCE[operator]){stack.push(element);break}terms.push(element)}TERMINATORS[operator]||stack.push(operator),expression=expression.substr(match.index+operator.length)}return(expression=expression.trim())&&terms.push(expression),terms.concat(stack.reverse())}(expression);return function(variables){return function evaluate(postfix,variables){var i,j,args,getOperatorResult,term,value,stack=[];for(i=0;i<postfix.length;i++){if(term=postfix[i],getOperatorResult=OPERATORS[term]){for(j=getOperatorResult.length,args=Array(j);j--;)args[j]=stack.pop();try{value=getOperatorResult.apply(null,args)}catch(earlyReturn){return earlyReturn}}else value=variables.hasOwnProperty(term)?variables[term]:+term;stack.push(value)}return stack[0]}(terms,variables)}}var DEFAULT_OPTIONS={contextDelimiter:"",onMissingKey:null};function Tannin(data,options){var key;for(key in this.data=data,this.pluralForms={},this.options={},DEFAULT_OPTIONS)this.options[key]=void 0!==options&&key in options?options[key]:DEFAULT_OPTIONS[key]}Tannin.prototype.getPluralForm=function(domain,n){var config,plural,pf,getPluralForm=this.pluralForms[domain];return getPluralForm||("function"!=typeof(pf=(config=this.data[domain][""])["Plural-Forms"]||config["plural-forms"]||config.plural_forms)&&(plural=function getPluralExpression(pf){var parts,i,part;for(parts=pf.split(";"),i=0;i<parts.length;i++)if(0===(part=parts[i].trim()).indexOf("plural="))return part.substr(7)}(config["Plural-Forms"]||config["plural-forms"]||config.plural_forms),pf=function pluralForms(expression){var evaluate=compile(expression);return function(n){return+evaluate({n:n})}}(plural)),getPluralForm=this.pluralForms[domain]=pf),getPluralForm(n)},Tannin.prototype.dcnpgettext=function(domain,context,singular,plural,n){var index,key,entry;return index=void 0===n?0:this.getPluralForm(domain,n),key=singular,context&&(key=context+this.options.contextDelimiter+singular),(entry=this.data[domain][key])&&entry[index]?entry[index]:(this.options.onMissingKey&&this.options.onMissingKey(singular,domain),0===index?singular:plural)}},"./packages/components/node_modules/@floating-ui/react-dom/dist/floating-ui.react-dom.esm.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,{YF:function(){return useFloating},x7:function(){return arrow}});var _floating_ui_dom__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@floating-ui/core/dist/floating-ui.core.mjs"),_floating_ui_dom__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs"),react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),react_dom__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react-dom/index.js");const arrow=options=>({name:"arrow",options:options,fn(state){const{element:element,padding:padding}="function"==typeof options?options(state):options;return element&&function isRef(value){return{}.hasOwnProperty.call(value,"current")}(element)?null!=element.current?(0,_floating_ui_dom__WEBPACK_IMPORTED_MODULE_2__.x7)({element:element.current,padding:padding}).fn(state):{}:element?(0,_floating_ui_dom__WEBPACK_IMPORTED_MODULE_2__.x7)({element:element,padding:padding}).fn(state):{}}});var index="undefined"!=typeof document?react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect:react__WEBPACK_IMPORTED_MODULE_0__.useEffect;function deepEqual(a,b){if(a===b)return!0;if(typeof a!=typeof b)return!1;if("function"==typeof a&&a.toString()===b.toString())return!0;let length,i,keys;if(a&&b&&"object"==typeof a){if(Array.isArray(a)){if(length=a.length,length!=b.length)return!1;for(i=length;0!=i--;)if(!deepEqual(a[i],b[i]))return!1;return!0}if(keys=Object.keys(a),length=keys.length,length!==Object.keys(b).length)return!1;for(i=length;0!=i--;)if(!{}.hasOwnProperty.call(b,keys[i]))return!1;for(i=length;0!=i--;){const key=keys[i];if(("_owner"!==key||!a.$$typeof)&&!deepEqual(a[key],b[key]))return!1}return!0}return a!=a&&b!=b}function getDPR(element){if("undefined"==typeof window)return 1;return(element.ownerDocument.defaultView||window).devicePixelRatio||1}function roundByDPR(element,value){const dpr=getDPR(element);return Math.round(value*dpr)/dpr}function useLatestRef(value){const ref=react__WEBPACK_IMPORTED_MODULE_0__.useRef(value);return index((()=>{ref.current=value})),ref}function useFloating(options){void 0===options&&(options={});const{placement:placement="bottom",strategy:strategy="absolute",middleware:middleware=[],platform:platform,elements:{reference:externalReference,floating:externalFloating}={},transform:transform=!0,whileElementsMounted:whileElementsMounted,open:open}=options,[data,setData]=react__WEBPACK_IMPORTED_MODULE_0__.useState({x:0,y:0,strategy:strategy,placement:placement,middlewareData:{},isPositioned:!1}),[latestMiddleware,setLatestMiddleware]=react__WEBPACK_IMPORTED_MODULE_0__.useState(middleware);deepEqual(latestMiddleware,middleware)||setLatestMiddleware(middleware);const[_reference,_setReference]=react__WEBPACK_IMPORTED_MODULE_0__.useState(null),[_floating,_setFloating]=react__WEBPACK_IMPORTED_MODULE_0__.useState(null),setReference=react__WEBPACK_IMPORTED_MODULE_0__.useCallback((node=>{node!=referenceRef.current&&(referenceRef.current=node,_setReference(node))}),[_setReference]),setFloating=react__WEBPACK_IMPORTED_MODULE_0__.useCallback((node=>{node!==floatingRef.current&&(floatingRef.current=node,_setFloating(node))}),[_setFloating]),referenceEl=externalReference||_reference,floatingEl=externalFloating||_floating,referenceRef=react__WEBPACK_IMPORTED_MODULE_0__.useRef(null),floatingRef=react__WEBPACK_IMPORTED_MODULE_0__.useRef(null),dataRef=react__WEBPACK_IMPORTED_MODULE_0__.useRef(data),whileElementsMountedRef=useLatestRef(whileElementsMounted),platformRef=useLatestRef(platform),update=react__WEBPACK_IMPORTED_MODULE_0__.useCallback((()=>{if(!referenceRef.current||!floatingRef.current)return;const config={placement:placement,strategy:strategy,middleware:latestMiddleware};platformRef.current&&(config.platform=platformRef.current),(0,_floating_ui_dom__WEBPACK_IMPORTED_MODULE_3__.oo)(referenceRef.current,floatingRef.current,config).then((data=>{const fullData={...data,isPositioned:!0};isMountedRef.current&&!deepEqual(dataRef.current,fullData)&&(dataRef.current=fullData,react_dom__WEBPACK_IMPORTED_MODULE_1__.flushSync((()=>{setData(fullData)})))}))}),[latestMiddleware,placement,strategy,platformRef]);index((()=>{!1===open&&dataRef.current.isPositioned&&(dataRef.current.isPositioned=!1,setData((data=>({...data,isPositioned:!1}))))}),[open]);const isMountedRef=react__WEBPACK_IMPORTED_MODULE_0__.useRef(!1);index((()=>(isMountedRef.current=!0,()=>{isMountedRef.current=!1})),[]),index((()=>{if(referenceEl&&(referenceRef.current=referenceEl),floatingEl&&(floatingRef.current=floatingEl),referenceEl&&floatingEl){if(whileElementsMountedRef.current)return whileElementsMountedRef.current(referenceEl,floatingEl,update);update()}}),[referenceEl,floatingEl,update,whileElementsMountedRef]);const refs=react__WEBPACK_IMPORTED_MODULE_0__.useMemo((()=>({reference:referenceRef,floating:floatingRef,setReference:setReference,setFloating:setFloating})),[setReference,setFloating]),elements=react__WEBPACK_IMPORTED_MODULE_0__.useMemo((()=>({reference:referenceEl,floating:floatingEl})),[referenceEl,floatingEl]),floatingStyles=react__WEBPACK_IMPORTED_MODULE_0__.useMemo((()=>{const initialStyles={position:strategy,left:0,top:0};if(!elements.floating)return initialStyles;const x=roundByDPR(elements.floating,data.x),y=roundByDPR(elements.floating,data.y);return transform?{...initialStyles,transform:"translate("+x+"px, "+y+"px)",...getDPR(elements.floating)>=1.5&&{willChange:"transform"}}:{position:strategy,left:x,top:y}}),[strategy,transform,elements.floating,data.x,data.y]);return react__WEBPACK_IMPORTED_MODULE_0__.useMemo((()=>({...data,update:update,refs:refs,elements:elements,floatingStyles:floatingStyles})),[data,update,refs,elements,floatingStyles])}},"./packages/components/node_modules/framer-motion/dist/es/utils/reduced-motion/use-reduced-motion.mjs":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,{J:function(){return useReducedMotion}});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_index_mjs__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./packages/components/node_modules/framer-motion/dist/es/utils/reduced-motion/index.mjs"),_state_mjs__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./packages/components/node_modules/framer-motion/dist/es/utils/reduced-motion/state.mjs");function useReducedMotion(){!_state_mjs__WEBPACK_IMPORTED_MODULE_1__.O.current&&(0,_index_mjs__WEBPACK_IMPORTED_MODULE_2__.A)();const[shouldReduceMotion]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(_state_mjs__WEBPACK_IMPORTED_MODULE_1__.n.current);return shouldReduceMotion}},"./packages/components/node_modules/path-to-regexp/dist.es2015/index.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){"use strict";function parse(str,options){void 0===options&&(options={});for(var tokens=function lexer(str){for(var tokens=[],i=0;i<str.length;){var char=str[i];if("*"!==char&&"+"!==char&&"?"!==char)if("\\"!==char)if("{"!==char)if("}"!==char)if(":"!==char)if("("!==char)tokens.push({type:"CHAR",index:i,value:str[i++]});else{var count=1,pattern="";if("?"===str[j=i+1])throw new TypeError('Pattern cannot start with "?" at '.concat(j));for(;j<str.length;)if("\\"!==str[j]){if(")"===str[j]){if(0==--count){j++;break}}else if("("===str[j]&&(count++,"?"!==str[j+1]))throw new TypeError("Capturing groups are not allowed at ".concat(j));pattern+=str[j++]}else pattern+=str[j++]+str[j++];if(count)throw new TypeError("Unbalanced pattern at ".concat(i));if(!pattern)throw new TypeError("Missing pattern at ".concat(i));tokens.push({type:"PATTERN",index:i,value:pattern}),i=j}else{for(var name="",j=i+1;j<str.length;){var code=str.charCodeAt(j);if(!(code>=48&&code<=57||code>=65&&code<=90||code>=97&&code<=122||95===code))break;name+=str[j++]}if(!name)throw new TypeError("Missing parameter name at ".concat(i));tokens.push({type:"NAME",index:i,value:name}),i=j}else tokens.push({type:"CLOSE",index:i,value:str[i++]});else tokens.push({type:"OPEN",index:i,value:str[i++]});else tokens.push({type:"ESCAPED_CHAR",index:i++,value:str[i++]});else tokens.push({type:"MODIFIER",index:i,value:str[i++]})}return tokens.push({type:"END",index:i,value:""}),tokens}(str),_a=options.prefixes,prefixes=void 0===_a?"./":_a,defaultPattern="[^".concat(escapeString(options.delimiter||"/#?"),"]+?"),result=[],key=0,i=0,path="",tryConsume=function(type){if(i<tokens.length&&tokens[i].type===type)return tokens[i++].value},mustConsume=function(type){var value=tryConsume(type);if(void 0!==value)return value;var _a=tokens[i],nextType=_a.type,index=_a.index;throw new TypeError("Unexpected ".concat(nextType," at ").concat(index,", expected ").concat(type))},consumeText=function(){for(var value,result="";value=tryConsume("CHAR")||tryConsume("ESCAPED_CHAR");)result+=value;return result};i<tokens.length;){var char=tryConsume("CHAR"),name=tryConsume("NAME"),pattern=tryConsume("PATTERN");if(name||pattern){var prefix=char||"";-1===prefixes.indexOf(prefix)&&(path+=prefix,prefix=""),path&&(result.push(path),path=""),result.push({name:name||key++,prefix:prefix,suffix:"",pattern:pattern||defaultPattern,modifier:tryConsume("MODIFIER")||""})}else{var value=char||tryConsume("ESCAPED_CHAR");if(value)path+=value;else if(path&&(result.push(path),path=""),tryConsume("OPEN")){prefix=consumeText();var name_1=tryConsume("NAME")||"",pattern_1=tryConsume("PATTERN")||"",suffix=consumeText();mustConsume("CLOSE"),result.push({name:name_1||(pattern_1?key++:""),pattern:name_1&&!pattern_1?defaultPattern:pattern_1,prefix:prefix,suffix:suffix,modifier:tryConsume("MODIFIER")||""})}else mustConsume("END")}}return result}function match(str,options){var keys=[];return function regexpToFunction(re,keys,options){void 0===options&&(options={});var _a=options.decode,decode=void 0===_a?function(x){return x}:_a;return function(pathname){var m=re.exec(pathname);if(!m)return!1;for(var path=m[0],index=m.index,params=Object.create(null),_loop_1=function(i){if(void 0===m[i])return"continue";var key=keys[i-1];"*"===key.modifier||"+"===key.modifier?params[key.name]=m[i].split(key.prefix+key.suffix).map((function(value){return decode(value,key)})):params[key.name]=decode(m[i],key)},i=1;i<m.length;i++)_loop_1(i);return{path:path,index:index,params:params}}}(pathToRegexp(str,keys,options),keys,options)}function escapeString(str){return str.replace(/([.+*?=^!:${}()[\]|/\\])/g,"\\$1")}function flags(options){return options&&options.sensitive?"":"i"}function stringToRegexp(path,keys,options){return function tokensToRegexp(tokens,keys,options){void 0===options&&(options={});for(var _a=options.strict,strict=void 0!==_a&&_a,_b=options.start,start=void 0===_b||_b,_c=options.end,end=void 0===_c||_c,_d=options.encode,encode=void 0===_d?function(x){return x}:_d,_e=options.delimiter,delimiter=void 0===_e?"/#?":_e,_f=options.endsWith,endsWithRe="[".concat(escapeString(void 0===_f?"":_f),"]|$"),delimiterRe="[".concat(escapeString(delimiter),"]"),route=start?"^":"",_i=0,tokens_1=tokens;_i<tokens_1.length;_i++){var token=tokens_1[_i];if("string"==typeof token)route+=escapeString(encode(token));else{var prefix=escapeString(encode(token.prefix)),suffix=escapeString(encode(token.suffix));if(token.pattern)if(keys&&keys.push(token),prefix||suffix)if("+"===token.modifier||"*"===token.modifier){var mod="*"===token.modifier?"?":"";route+="(?:".concat(prefix,"((?:").concat(token.pattern,")(?:").concat(suffix).concat(prefix,"(?:").concat(token.pattern,"))*)").concat(suffix,")").concat(mod)}else route+="(?:".concat(prefix,"(").concat(token.pattern,")").concat(suffix,")").concat(token.modifier);else"+"===token.modifier||"*"===token.modifier?route+="((?:".concat(token.pattern,")").concat(token.modifier,")"):route+="(".concat(token.pattern,")").concat(token.modifier);else route+="(?:".concat(prefix).concat(suffix,")").concat(token.modifier)}}if(end)strict||(route+="".concat(delimiterRe,"?")),route+=options.endsWith?"(?=".concat(endsWithRe,")"):"$";else{var endToken=tokens[tokens.length-1],isEndDelimited="string"==typeof endToken?delimiterRe.indexOf(endToken[endToken.length-1])>-1:void 0===endToken;strict||(route+="(?:".concat(delimiterRe,"(?=").concat(endsWithRe,"))?")),isEndDelimited||(route+="(?=".concat(delimiterRe,"|").concat(endsWithRe,")"))}return new RegExp(route,flags(options))}(parse(path,options),keys,options)}function pathToRegexp(path,keys,options){return path instanceof RegExp?function regexpToRegexp(path,keys){if(!keys)return path;for(var groupsRegex=/\((?:\?<(.*?)>)?(?!\?)/g,index=0,execResult=groupsRegex.exec(path.source);execResult;)keys.push({name:execResult[1]||index++,prefix:"",suffix:"",modifier:"",pattern:""}),execResult=groupsRegex.exec(path.source);return path}(path,keys):Array.isArray(path)?function arrayToRegexp(paths,keys,options){var parts=paths.map((function(path){return pathToRegexp(path,keys,options).source}));return new RegExp("(?:".concat(parts.join("|"),")"),flags(options))}(path,keys,options):stringToRegexp(path,keys,options)}__webpack_require__.d(__webpack_exports__,{EQ:function(){return match}})}}]);