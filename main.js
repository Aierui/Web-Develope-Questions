/**
 * 编程类操作
 * @author aierui
 * @Email aieruishi@gmail.com
 */

// Closures
// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Closures

function init() {
    let name = 'aierui';
    // name 是一个被init创建的局部变量
    function displayName() { // displayName() 是一个内部函数,
        alert(name) //  一个闭包使用在父函数中声明的变量
    }
    displayName();
}

init();


// 事件代理
function event(element, type, handler) {
    if (element.addEventListener) { // DOM2
        element.addEventListener(type, handler, false); //监听函数只在冒泡阶段被触发
    } else if (element.attachEvent) { // IE
        element.attachEvent('on' + type, handler);
    } else { // DOM0
        element['on' + type] = handler;
    }
}


//去重、排序、常用库函数实现其原理

// 采用 indexOf
Array.prototype.unique = function() {
    var result = [];

    this.forEach(function(v) {
        if (result.indexOf(v) < 0) {
            result.push(v)
        }
    })

    return result;
}



// 去重、利用hash表去重，这是一种空间换时间的方法

Array.prototype.unique = function() {
    var result = [],
        hash = {}

    this.forEach(function(val, index) {
        if (!hash[v]) {
            hash[v] = true
            result.push(v)
        }
    })

    return result;
}


// 上面的方法存在一个bug，对于数组[1,2,’1’,’2’,3]，去重结果为[1,2,3]，原因在于对象对属性索引时会进行强制类型转换，arr[‘1’]和arr[1]得到的都是arr[1]的值，因此需做一些改变：

Array.prototype.unique = function() {
    var result = [],
        hash = {}

    this.forEach(function(v) {
        var type = typeof(v); //获取元素类型

        hash[v] || (hash[v] = new Array());

        if (hash[v].indexOf(type) < 0) {
            hash[v].push(type); //存储类型
            result.push(v);
        }

    });

    return result;
}

var unique = function(a) {
  return Array.from(new Set(a));
}


var unique = function (a){
  a.filter(function(ele,index,array){
      return index===array.indexOf(ele)
  })
}


function insertAfter(newElement,targetElement){  
  var parent=targetElement.parentNode;  
  if(parent.lastChild==targetElement){  
    parent.appendChild(newElement);  
  }else{  
    parent.insertBefore(newElement,targetElement.nextSibling);  
  }  
}  

Array.prototype.map = function(callback, thisArg) {

  var T, A, k;

  if (this == null) {
    throw new TypeError(" this is null or not defined");
  }

  // 1. 将O赋值为调用map方法的数组.
  var O = Object(this);

  // 2.将len赋值为数组O的长度.
  var len = O.length >>> 0; // >> 右移,高位补符号位” 这里右移一位表示除2 “>>> 无符号右移 高位补0

  // 3.如果callback不是函数,则抛出TypeError异常.
  if (Object.prototype.toString.call(callback) != "[object Function]") {
    throw new TypeError(callback + " is not a function");
  }

  // 4. 如果参数thisArg有值,则将T赋值为thisArg;否则T为undefined.
  if (thisArg) {
    T = thisArg;
  }

  // 5. 创建新数组A,长度为原数组O长度len
  A = new Array(len);

  // 6. 将k赋值为0
  k = 0;

  // 7. 当 k < len 时,执行循环.
  while(k < len) { 

    var kValue, mappedValue;

    //遍历O,k为原数组索引
    if (k in O) {

      //kValue为索引k对应的值.
      kValue = O[ k ];

      // 执行callback,this指向T,参数有三个.分别是kValue:值,k:索引,O:原数组.
      mappedValue = callback.call(T, kValue, k, O);

      // 返回值添加到新数组A中.
      A[ k ] = mappedValue;
    }
    // k自增1
    k++;
  }

  // 8. 返回新数组A
  return A;
};      



var elems = document.querySelectorAll('select option:checked');
var values = [].map.call(elems, function(obj) {
  return obj.value;
});


// 下面的语句返回什么呢:
["1", "2", "3"].map(parseInt);
// 你可能觉的会是[1, 2, 3]
// 但实际的结果是 [1, NaN, NaN]

// 通常使用parseInt时,只需要传递一个参数.
// 但实际上,parseInt可以有两个参数.第二个参数是进制数.
// 可以通过语句"alert(parseInt.length)===2"来验证.
// map方法在调用callback函数时,会给它传递三个参数:当前正在遍历的元素, 
// 元素索引, 原数组本身.
// 第三个参数parseInt会忽视, 但第二个参数不会,也就是说,
// parseInt把传过来的索引值当成进制数来使用.从而返回了NaN.

function returnInt(element) {
  return parseInt(element, 10);
}

['1', '2', '3'].map(returnInt); // [1, 2, 3]
// 意料之中的结果

// 也可以使用简单的箭头函数，结果同上
['1', '2', '3'].map( str => parseInt(str) );

// 一个更简单的方式:
['1', '2', '3'].map(Number); // [1, 2, 3]
// 与`parseInt` 不同，下面的结果会返回浮点数或指数:
['1.1', '2.2e2', '3e300'].map(Number); // [1.1, 220, 3e+300]

Array.prototype.some = function(fun /*, thisArg */)
{
  'use strict';

  if (this === void 0 || this === null)
    throw new TypeError();

  var t = Object(this);
  var len = t.length >>> 0;
  if (typeof fun !== 'function')
    throw new TypeError();

  var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
  for (var i = 0; i < len; i++)
  {
    if (i in t && fun.call(thisArg, t[i], i, t))
      return true;
  }

  return false;
};


// 实现一个函数clone，可以对JavaScript中的5种主要的数据类型（包括Number、String、Object、Array、Boolean）进行值复制
function clone(obj) {
    var o;

    switch (typeof obj) {
        case 'undefined':
            break;
        case 'string':
            o = obj + ''
            break;
        case 'number':
            o = obj - 0
            break;
        case 'boolean':
            o = obj
            break;
        case 'object':
            if (obj === null) {
                o = null
            } else {
                if (Object.prototype.toString.call(obj).slice(8, -1) == 'Array') {
                    o = [];
                    for (var i = 0; i < obj.length; i++) {
                        o.push(clone(obj[i]))
                    }
                } else {
                    o = {}
                    for (key in obj) {
                        if (obj.hasOwnProperty(key)) {
                            o[key] = clone(obj[key])
                        }
                    }

                }
            }
            break;
        default:
            o = obj
    }

    return o;
}

// 没发拷贝方法，必须要符合json格式的数据
// 会抛弃对象的constructor，也就是深复制之后，无论这个对象原本的构造函数是什么，在深复制之后都会变成Object
function cloneObject(src) {
    var clone = JSON.parse(JSON.stringify(src));
    return clone;
 }

 function cloneObject(src) {
    var clone = src;

    // 对于Date,String,Boolean等引用类型的数据，需要考虑调用构造函数重新构造，
    //直接赋值依然会有引用问题（不是真正的clone引用变量）
    // 对于 Date
    if (src instanceof Date) {
        clone = new Date(src.getTime());
        return clone;
    }

    // 对于Object和Array的遍历，可以使用for in，
    //这样可以保证在在Array对象上扩展的属性也可以正确复制
    // 对于 数组
    if (src instanceof Array) {
        clone = [];
        for (var key in src) {
            clone[key] = cloneObject(src[key]);
        }
        return clone;
    }

    // 对于 Object
    if (src instanceof Object) {
        clone = {};
        for (var key in src) {
            if (src.hasOwnProperty(key)) {       // 忽略掉继承属性
                clone[key] = cloneObject(src[key]);
            }
        }
        return clone;
    }

    // 对于 数字 字符串 布尔 null undefined
    return src;
}


var remove = function (obj, k){
	for (key in obj) {
		if (obj.hasOwnProperty(key) && key == k) {
			delete obj[k]
			return true
		}
	}
	return false;
}

// 继承给Object
Object.prototype.remove = function ( k ){
	if (this === void 0 || this === null)
    throw new TypeError();

  var obj = Object(this);
	for (key in obj) {
		if (obj.hasOwnProperty(key) && key == k) {
			delete obj[k]
			return true
		}
	}
	return false;
}


var compose = function(...args) {
    var len = args.length
    var count = len - 1
    var result
    return function f1(...args1) {
        result = args[count].apply(this, args1)
        if (count <= 0) {
            count = len - 1
            return result
        } else {
            count--
            return f1.call(null, result)
        }
    }
}


//  实现一个forEach函数，即可遍历数组，也可以遍历对象
function forEach(obj, fn) {
    var key;
    if (obj instanceof Array) {
        obj.forEach(function(item, index) {
            fn(index, item)
        })
    } else {
        for (key in obj) {
            if (obj.hasOwnProperty(key)) { // 注意这里的 hasOwnProperty 是自己的属性还是圆型链上的
                fn(key, obj[key])
            }
        }
    }
}


function huo(x){
	let count = 0;
	while(x){
		count ++;
		x= x&(x-1);
	}
	return count;
}


// 实现 bind() 
// bind() 方法创建一个新的函数, 当被调用时，将其this关键字设置为提供的值，在调用新函数时，在任何提供之前提供一个给定的参数序列。
// bind() 作用有两个，1、绑定this， 2、柯里化

Function.prototype.bind = function(that) {
    if (typeof this !== 'function') {
        throw new TypeError()
    }

    var args = Array.prototype.slice.call(arguments, 1),
        _bind = this,
        f = function() {},
        bounding = function() {
            //采用 apply(this, []) 方式调用 
            return _bind.apply(
                this instanceof f ? this : that, // 这里这个 this 即是 调用方的 function 
                args.concat(Array.prototype.slice.call(arguments))
            );
        }

    // 设置原型链
    f.prototype = this.prototype;
    bounding.prototype = new f();

    return bounding;
}

export function bind (fn, ctx) {
  function boundFn (a) {
    const l = arguments.length
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }
  // record original fn length
  boundFn._length = fn.length
  return boundFn
}

function foo(){
	this.b = 100;
	return this.a
}
var func = foo.bind({a:1})
func();// 1;
new func();//{b:100}



// 手写数组扁平化（[1,2,3,[1,2,3],[2,[3,4],3]]>[1,2,3,1,2,3,2,3,4,3]）算法；
function flatten(arr) {
    return arr.toString().split(',');
}



// 随机数

function randMember(length) {
    if (length == undefined) {
        length = 10
    }

    var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    var str = "";
    for (var i = 0; i < length; i++) {
        str += chars.substr(Math.ceil(Math.random() * chars.length), 1);
    }
    return str;
}



// 有问题

function randomArray(length) {
    var i, index, temp, arr = [length];
    length = typeof(length) === 'undefined' ? 9 : length;

    for (i = 1; i <= length; i++) {
        arr[i - 1] = i;
    }

    for (i = 1; i <= length; i++) {
        index = parseInt(Math.random() * (length - 1)) + 1;

        if (index != i) {
            temp = arr[i];
            arr[i] = arr[index];
            arr[index] = temp;
        }
    }
}



// 快速排序
//排序过程只需要三步：
//　1.在数据集之中，找一个基准点
//  2.建立两个数组，分别存储左边和右边的数组
//  3.利用递归进行下次比较


function quickSort(arr) {
    if (arr.length <= 1) return arr; //如果数组只有一个数，就直接返回；

    var index = Math.floor(arr.length / 2); //找到中间数的索引值，如果是浮点数，则向下取整

    var key = arr.splice(index, 1)[0]; //找到中间数的值

    var left = [],
        right = [];

    arr.forEach(function(v) {
        v <= key ? left.push(v) : right.push(v); //基准点的左边的数传到左边数组、右边的数传到右边数组
    });

    return quickSort(left).concat([key], quickSort(right)); //递归不断重复比较
}


// 出现次数超过一半的数字

function findExceedNum(arr) {
    var rtn = [],
        mid = Math.ceil(arr.length / 2),
        hash = {}
    arr.forEach(function(item, index) {
        if (!hash[item]) {
            hash[item] = true;
            rtn[item] = 1
        } else {
            rtn[item]++
        }
    })

    rtn.forEach(function(v, index) { // forEach 可以自动过滤掉数组key为undefined

        if (v >= mid) {
            console.log(index)
        }
    })
}


function find_exceed_num(arr) {
    var result = [],
        mid = Math.ceil(arr.length / 2),
        hash = {},
        rtn = [];

    arr.forEach(function(item, index) {
        if (!hash[item]) {
            hash[item] = true;
            rtn[item] = 1;
        } else {
            rtn[item]++
                if (rtn[item] >= mid && result.indexOf(item) < 0) {
                    result.push(item);
                }
        }
    })
    return result; //返回一个出现次数超过一半的数组，
}


// 最大连续子数组和

function getTempValue(temp, currentValue) {
    if (temp.sum >= 0) {
        return {
            num: temp.num + 1,
            sum: temp.sum + currentValue
        }
    } else {
        return {
            num: 1,
            sum: currentValue
        }
    }
}

function getSubMaxSum(line) {
    if (line.length === 0) return;
    var temps = [];

    var temp = {
        num: 1,
        sum: line[0]
    }
    temps.push(temp);

    for (var i = 1, len = line.length; i < len; i++) {

        var temp = getTempValue(temps[i - 1], line[i]);
        temps.push(temp);
    }

    var maxValue,
        indexArr = [];
    maxValue = temps[0].sum;
    indexArr.push(0);
    for (var i = 1, len = temps.length; i < len; i++) {
        var ref = temps[i];
        if (ref.sum === maxValue) {
            indexArr.push(i);
        } else if (ref.sum > maxValue) {
            maxValue = ref.sum;
            indexArr.length = 0; //重置数组
            indexArr.push(i);
        }
    }
    return maxValue
}




// 有序数组的查找

function containe(arr, val) {
    var i = arr.length;
    while (i--) {
        if (arr[i] == val) {
            return true;
        }
    }
    return false;
}

function find_number(arr, val) {
    if (typeof val != 'number') return false;
    arr.sort(function(a, b){
    	return a - b;
    });
    var l = 0,
        r = arr.length;
    while (l <= r) {
        var mid = Math.floor((l + r) / 2);
        if (arr[mid] > val) {
            r = mid - 1;
        } else if (arr[mid] < val) {
            l = mid + 1;
        } else {
            return arr[mid];
        }
    }
    return false;
}



// 字符串全排列



// 重建二叉树

function TreeNode(x) {    
    this.val = x;    
    this.left = null;    
    this.right = null;
} 
function reConstructBinaryTree(pre, vin) {    
    if (vin.length === 0) return null;         
    var root = 0,
        i, j;    
    var left_pre = [],
        right_pre = [],
        left_in = [],
        right_in = [];      
           
    var head = new TreeNode(pre[0]);   
     
    for (i = 0; i < vin.length; i++) {         
    	if (vin[i] === pre[0]) {             
    			root = i;             
    			break;        
    	}     
    } 
       
    for (j = 0; j < root; j++) {        
        left_pre.push(pre[j + 1]);        
        left_in.push(vin[j]);    
    }  
      
    for (j = root + 1; j < vin.length; j++) {        
        right_pre.push(pre[j]);        
        right_in.push(vin[j]);    
    }         
    head.left = reConstructBinaryTree(left_pre, left_in);    
    head.right = reConstructBinaryTree(right_pre, right_in);         
    return head;     
}


// 旋转数列
function minNumberInRotateArray(rotateArray) {
    // write code here
    if (rotateArray.length === 0) {
        return 0;
    }
    rotateArray.sort(function(a, b) {
        return a - b;
    });
    return rotateArray[0];
}

// 斐波那契数列
function Fibonacci(n) {
    // write code here

    if (n == 0) {
        return 0;
    } else if (n == 1) {
        return 1;
    }
    var fibona = [0, 1];

    for (var i = 2; i <= n; i++) {
        fibona.push(fibona[i - 1] + fibona[i - 2]);
    }
    return fibona.pop();
}


function swap_v2(first, second, third) {
    third = first + second;
    first = second;
    second = third;
}


// 输入一个整数，输出该数二进制表示中1的个数。其中负数用补码表示
//Javascript 描述
function NumberOf1(n) {    
    var num = 0;    
    while (n) {        
        num++;        
        n = (n - 1) & n;    
    }    
    return num;
}

// 判断一个数是否是2的方幂 
// n > 0 && (n & (n -1) == 0)   采用位操作符号却是就变的简单多啦



//
function m(n, k) {
    let bin = typeof(n) == 'number' ? (n).toString(k) : n.toString(k);
    //console.log(bin);
    let base7 = ['f', 'c', 'e', '2', '0', '1', '7'];
    var rtn = '';
    bin.split('').forEach(function(v) { // split 功能很强大  分割一个字符串为数组很方方便
        // str.split([separator[, limit]])  separator 可以是一个字符串或正则表达式 如果分隔符为空字符串，则将str原字符串中每个字符的数组形式返
        rtn += base7[v]
    })
    return rtn;
}
// m(2017, 7) //17cc

function convert(a, b) {
    let rtn = [];
    while (a > 0) {
        rtn.push(a % b);
        a = Math.floor(a / b)
    }
    return rtn.reverse().join(''); //join 默认是英文逗号 split 默认是将字符串以字符形式分割
}


//求最大公约数
//方案一 辗转相处法则
function gcd(a, b) {
    while (a % b != 0) {
        var c = a % b;
        a = b;
        b = c;
    }
    return b;
}

// 求最小公倍数 最小公倍数 = 两个数的积 / 最大公约数
function lcm(a, b) {
    return a * b / gcd(a, b)
}

// 10进制转化成62进制
function string10to62(number) {
    var chars = '0123456789abcdefghigklmnopqrstuvwxyzABCDEFGHIGKLMNOPQRSTUVWXYZ'.split(''),
        radix = chars.length,
        qutient = +number,
        arr = [];
    do {
        mod = qutient % radix;
        qutient = (qutient - mod) / radix;
        arr.unshift(chars[mod]);
    } while (qutient);
    return arr.join('');
}

// 62进制转化成10进制
function string62to10(number_code) {
    var chars = '0123456789abcdefghigklmnopqrstuvwxyzABCDEFGHIGKLMNOPQRSTUVWXYZ',
        radix = chars.length,
        number_code = String(number_code),
        len = number_code.length,
        i = 0,
        origin_number = 0;
    while (i < len) {
        origin_number += Math.pow(radix, i++) * chars.indexOf(number_code.charAt(len - i) || 0);
    }
    return origin_number;
}


// JS 栈

function Stack() {
    var items = [];
    this.push = function(element) {
        items.push(element);
    };
    this.pop = function() {
        return items.pop();
    };
    this.peek = function() {
        return items[items.length - 1];
    };
    this.isEmpty = function() {
        return items.length == 0;
    };
    this.size = function() {
        return items.length;
    };
    this.clear = function() {
        items = [];
    };
    this.print = function() {
        console.log(items.toString());
    };
}

function Queue() {
    var items = [];
    this.enqueue = function(element) {
        items.push(element);
    };
    this.dequeue = function() {
        return items.shift();
    };
    this.front = function() {
        return items[0];
    };
    this.isEmpty = function() {
        return items.length == 0;
    };
    this.clear = function() {
        items = [];
    };
    this.size = function() {
        return items.length;
    };
    this.print = function() {
        console.log(items.toString());
    }
}


// 链表

function LinkedList() {
    var Node = function(element) {
        this.element = element;
        this.next = null;
    };
    var length = 0;
    var head = null;
    this.append = function(element) {
        var node = new Node(element), current;
        if (head === null) { //列表中第一个节点 
        	head = node;
        } else {
          current = head; 
          //循环列表，直到找到最后一项 
          while(current.next){
	          current = current.next;
        	}
	        //找到最后一项，将其next赋为node，建立链接
	        current.next = node; 
      	}
    	length++; //更新列表的长度 
    };
    this.insert = function(position, element) {
        //检查越界值
        if (position >= 0 && position <= length) { 
            var node = new Node(element),
                current = head,
                previous,
                index = 0;
            if (position === 0) { //在第一个位置添加 node.next = current; 
                head = node;
            } else {
                while (index++ < position) { 
                    previous = current;
                    current = current.next;
                }
                node.next = current; 
                previous.next = node; 
            }
            length++; //更新列表的长度
            return true;
        } else {
            return false; 
        }
    };
    this.removeAt = function(position) {
        //检查越界值
        if (position > -1 && position < length) { 
            var current = head, 
                previous, 
                index = 0; 
            //移除第一项
            if (position === 0) { 
                head = current.next;
            } else {
                while (index++ < position) { 
                    previous = current; 
                    current = current.next; 
                }
                //将previous与current的下一项链接起来:跳过current，从而移除它
                previous.next = current.next; 
            }
            length--; 
            return current.element;
        } else {
            return null; 
        }
    };
    this.remove = function(element) {
    	var index = this.indexOf(element);
    	return this.removeAt(index);
    };
    this.indexOf = function(element) {
        var current = head,
            index = -1;
        while (current) {
            if (element === current.element) {
                return index;
            }
            index++;
            current = current.next;
        }
        return -1;
    };
    this.isEmpty = function() {
    	return length === 0;
    };
    this.size = function() {
    	return length;
    };
    this.getHead = function(){
      return head;
		};
    this.toString = function() {
    	var current = head, string = '';
    	while (current) {
    		string += current.element
    		current = current.next
    	}
    	return string.split('').join();
    };
    this.print = function() {};
}


// 集合
function Set(){
	var items = {};
	this.add = function (value){
		if (!this.has(value)){
        items[value] = value; 
        return true;
    }
    return false;
	}
	this.remove = function(value) {
    if (this.has(value)) {
        delete items[value]; 
        return true;
    }
    return false;
	}
	this.has = function (value){
		return value in items; // return items.hasOwnProperty(value); 
	}
	this.clear = function(){
		items = {}; 
	}
	this.size = function(){
		return Object.keys(items).length;
	}
	this.values = function (){
		return Object.keys(items);
	}
	//并集
	this.union = function(otherSet) {
	    var unionSet = new Set();
	    var values = this.values();
	    for (var i = 0; i < values.length; i++) {
	        unionSet.add(values[i]);
	    }
	    values = otherSet.values();
	    for (var i = 0; i < values.length; i++) {
	        unionSet.add(values[i]);
	    }
	    return unionSet;
	}

	// 交集
	this.intersection = function(otherSet) {
	    var intersectionSet = new Set();
	    var values = this.values();
	    for (var i = 0; i < values.length; i++) {
	        if (otherSet.has(values[i])) {
	            intersectionSet.add(values[i]);
	        }
	    }
	    return intersectionSet;
	}

	// 差集
	this.difference = function(otherSet) {
	    var differenceSet = new Set();
	    var values = this.values();
	    for (var i = 0; i < values.length; i++) {
	        if (!otherSet.has(values[i])) {
	            differenceSet.add(values[i]);
	        }
	    }
	    return differenceSet;
	}

	// 子集
	this.subset = function(otherSet) {
    if (this.size() > otherSet.size()) {
        return false;
    } else {
        var values = this.values();
        for (var i = 0; i < values.length; i++) {
            if (!otherSet.has(values[i])) {
                return false;
            }
        }
        return true;
    }
	}
}

// 字典 => es6 Map

function Dictionary() {
  var items = {};

  this.set = function(key, value){
  	items[key] = value
  }
  this.remove = function(key){
  	if(this.has(key)){
  		delete items[key]
  		return true;
  	}
  	return false
  }
  this.has = function(key){
  	return key in items;
  }
  this.get = function(key){
  	 return this.has(key) ? items[key] : undefined;
  }
  this.keys = function () {
  	return Object.keys(items);
  }
  this.clear = function(){
		items = {}; 
	}
	this.size = function(){
		return Object.keys(items).length;
	}
  this.values = function() {
      var values = [];
      for (var k in items) {
          if (this.has(k)) {
              values.push(items[k]);
          }
      }
      return values;
  }
}


// 树 二叉搜索树（BST） 只允许你在左侧节点存储(比父节点)小的值， 在右侧节点存储(比父节点)大(或者等于)的值
function BinarySearchTree() {
  var Node = function(key) {
      this.key = key;
      this.left = null;
      this.right = null;
  };
  var root = null;

	this.insert = function(key) {
	    var newNode = new Node(key);
	    if (root === null) {
	        root = newNode;
	    } else {
	        insertNode(root, newNode);
	    }
	};

	var insertNode = function(node, newNode) {
	    if (newNode.key < node.key) {
	        if (node.left === null) {
	          node.left = newNode;
	        } else {
	          insertNode(node.left, newNode);
	        }
	    } else {
	        if (node.right === null) {
	          node.right = newNode;
	        } else {
	          insertNode(node.right, newNode);
	        }
	    }
	}

	// 中序
	this.inOrderTraverse = function(callback) {
	    inOrderTraverseNode(root, callback);
	}
	var inOrderTraverseNode = function(node, callback) {
	    if (node !== null) {
	        inOrderTraverseNode(node.left, callback);
	        callback(node.key);
	        inOrderTraverseNode(node.right, callback);
	    }
	}

	//先序
	this.preOrderTraverse = function(callback) {
	    preOrderTraverseNode(root, callback);
	}
	var preOrderTraverseNode = function(node, callback) {
	    if (node !== null) {
	        callback(node.key);
	        preOrderTraverseNode(node.left, callback);
	        preOrderTraverseNode(node.right, callback);
	    }
	}

	//后序
	this.postOrderTraverse = function(callback) {
	    postOrderTraverseNode(root, callback);
	}
	var postOrderTraverseNode = function(node, callback) {
	    if (node !== null) {
	        postOrderTraverseNode(node.left, callback);
	        postOrderTraverseNode(node.right, callback);
	        callback(node.key);
	    }
	}

	// 最小值
	this.min = function() {
    return minNode(root);
	}
	var minNode = function(node) {
	    if (node) {
	        while (node && node.left !== null) {
	            node = node.left;
	            return node.key;
	        }
	        return null;
	    }
	}

	// 最大值
	this.max = function() {
	    return maxNode(root);
	}
	var maxNode = function(node) {
	    if (node) {
	        while (node && node.right !== null) {
	            node = node.right;
	        }
	        return node.key;
	    }
	    return null;
	}

	// 按值搜索
	this.search = function(key) {
	    return searchNode(root, key);
	}
	var searchNode = function(node, key) {
	    if (node === null) {
	        return false;
	    }
	    if (key < node.key) {
	        return searchNode(node.left, key);
	    } else if (key > node.key) {
	        return searchNode(node.right, key);
	    } else {
	        return true;
	    }
	}

	this.remove = function(key) {
	    root = removeNode(root, key);
	};

	var removeNode = function(node, key) {
	    if (node === null) {
	        return null;
	    }
	    if (key < node.key) {
	        node.left = removeNode(node.left, key);
	        return node;
	    } else if (key > node.key) {
	        node.right = removeNode(node.right, key);
	        return node;
	    } else { //键等于node.key
	        //第一种情况——一个叶节点
        if (node.left === null && node.right === null) {
            node = null;
            return node;
        }
        //第二种情况——一个只有一个子节点的节点 
        if (node.left === null){
	        node = node.right;
	        return node;
		    } else if (node.right === null) { 7 
		    		node = node.left;
		        return node;
		    }
	    //第三种情况——一个有两个子节点的节点 7 
	    var aux = findMinNode(node.right);
	    node.key = aux.key;
	    node.right = removeNode(node.right, aux.key);
	    return node; 
		}
	}
}

function ArrayList() {
    var array = [];
    this.insert = function(item) {
        array.push(item);
    }
    this.toString = function() {
        return array.join();
    }

    this.bubbleSort = function(){
    	var len = array.length,
        i, j, stop;
	    for (i = 0; i < len - 1; i++) {
	        for (j = 0, stop = len - 1 - i; j < stop; j++) {// 已经排序过的不在排列
	            if (array[j] > array[j + 1]) {
	                swap(array, j, j + 1)
	            }
	        }
	    }
    }

    var swap = function(i, j) {
        var tem = array[i];
        array[i] = array[i];
        array[i] = tem;
    }

    this.selectionSort = function() {
        var length = array.length,
            indexMin;
        for (var i = 0; i < length - 1; i++) {
            indexMin = i;//假设当前位为最小;

            // 检查数组其余部分是否更小
            for (var j = i; j < length; j++) {
            	if (array[indexMin] > array[j]) {
		            indexMin = j;
		          }
            }
        }
        // 如果当前位置不是最小值，将其换为最小值
        if (i !== indexMin) {
            swap(i, indexMin);
        }
    }

    //它将数组分成“已排序”和“未排序”两部分
    this.insertionSort = function() {
        var length = array.length,
            j, temp;
        for (var i = 1; i < length; i++) {// 认为第一项已经是排序的
            j = i;
            temp = array[i];
            //当已排序部分的当前元素大于value， 就将当前元素向后移一位，再将前一位与value比较
            while (j > 0 && array[j - 1] > temp) {
                array[j] = array[j - 1];
                j--;
            }
            array[j] = temp;
        }
    }

    this.mergeSort = function() {
        array = mergeSortRec(array);
    };

    var mergeSortRec = function(array) {
        var length = array.length;
        if (length === 1) { 
            return array; 
        }
        var mid = Math.floor(length / 2),
            left = array.slice(0, mid),
            right = array.slice(mid, length); 
        return merge(mergeSortRec(left), mergeSortRec(right));  
    };

		var merge = function(left, right) {
		    var result = [],
		        il = 0,

		        ir = 0;
		    while (il < left.length && ir < right.length) {
		        if (left[il] < right[ir]) {
		            result.push(left[il++]);
		        } else {

		            result.push(right[ir++]);
		        }
		    }
		    while (il < left.length) {
		        result.push(left[il++]);
		    }
		    while (ir < right.length) {
		        result.push(right[ir++]);
		    }
		    return result;
		};

		this.quickSort = function() {
			//1、找个基准点 2、将数组分成两部分 3、递归
		    if (array.length <= 1) return array; //如果数组只有一个数，就直接返回；

		    var index = Math.floor(array.length / 2); //找到中间数的索引值，如果是浮点数，则向下取整

		    var key = array.splice(index, 1)[0]; //找到中间数的值

		    var left = [],
		        right = [];

		    array.forEach(function(v) {
		        v <= key ? left.push(v) : right.push(v); //基准点的左边的数传到左边数组、右边的数传到右边数组
		    });

		    return quickSort(left).concat([key], quickSort(right)); //递归不断重复比较
		};

		// 二分查找
		this.binarySearch = function(item) {
		    this.quickSort();
		    var low = 0,
		        high = array.length - 1,
		        mid, element;
		    while (low <= high) {
		        mid = Math.floor((low + high) / 2);
		        element = array[mid];
		        if (element < item) {
		            low = mid + 1;
		        } else if (element > item) {
		            high = mid - 1;
		        } else {
		            return mid;
		        }
		    }
		    return -1;
		}
}




// 观察者模式
class EventEmitter {
    constructor() {
        this._events = {}
    }
    // publish
    on(event, callback) {
        let callbacks = this._events[event] || []
        callbacks.push(callback)
        this._events[event] = callbacks
        return this
    }
    // remove
    off(event, callback) {
        let callbacks = this._events[event]
        this._events[event] = callbacks && callbacks.filter(fn => fn !== callback)
        return this
    }
    // Subscribe
    emit(...args) {
        const event = args[0]
        const params = [].slice.call(args, 1)
        const callbacks = this._events[event]
        callbacks.forEach(fn => fn.apply(this, params))
        return this
    }
    // Ensure a function is called only once.
    once(event, callback) {
        let wrapFunc = (...args) => {
            callback.apply(this, args)
            this.off(event, wrapFunc)
        }
        this.on(event, wrapFunc)
        return this
    }
    toggle(event, callback) {
        this.has(event, callback) ? this.off(event, callback) : this.on(event, callback)
        return this
    }
    has(event, callback) {
        let callbacks = this._events[event]
        let rtn = false
        callbacks.forEach(fn => fn === callback ? rtn = true : null)
        return rtn
    }
}


// 测试
let ee = new EventEmitter();
console.log(ee)
function a() {
    console.log('a')
}
function b() {
    console.log('b')
}
function c() {
    console.log('c')
}
function d(...a) {
    console.log('d',...a)
}
ee.on('TEST1', a).on('TEST2', b).once('TEST2', c).on('TEST2',d);
ee.emit('TEST1');
console.log(ee.has('TEST1',a));
ee.toggle('TEST1', function(){console.log('123456789=====>>>><<<<<>>>>>>')})
console.log('....')
ee.emit('TEST2');
// In test2
// In test2 again
console.log('....')
ee.emit('TEST2');


// 单例模式
class Single{
  constructor(){
    this._instance = null
  }
  sing(...args){
    console.log('sing', ...args)
  }
  instance(...args){
    if(!this._instance){
      this._instance = this.sing(...args)
    }
    return this._instance
  }
}

var s = new Single();
s.instance('1')
s.instance('2')
s.instance('3')





class Event{
  constructor(){
    this.events = {}
  }

  on(event, callback){
    let callbacks = this.events[event] || [];
    callbacks.push(callback);
    this.events[event] = callbacks;
    return this;
  }

  off(event, callback){
    let callbacks = this.events[event];
    this.events[event] = callbacks && callbacks.filter(fn => fn !== callback);
    return this;
  }

  once(event, callback){
    let wrapFunc = (...args) => {
      callback.apply(this, args)
      this.off(event, wrapFunc);
    }

    this.on(event, wrapFunc);
    return this;
  }

  emit(...args){
    let event = args[0];
    let params =  [].slice.call(args, 1);//args.splice(0, 1);
    let callbacks = this.events[event];
    callbacks.forEach(fn => fn.apply(this, params));
    return this;
  }

  has(event, callback){
    let callbacks = this.events[event];
    let rtn = false;
    callbacks.forEach(fn => fn === callback ? rtn = true : null);
    callbacks.some(fn => fn === callback ? rtn = true : null);
    return rtn;
  }
  toggle(event, callback){
    this.has(event, callback) ? this.off(event, callback) : on (event, callback)
  }
}


/**
请手动实现一个compose函数，满足以下功能：
传入的参数为一个数组，数组每一个元素均为函数，当调用compose后，返回一个可依次执行数组内的每个函数的函数。
PS: 数组内的函数有两个参数`value`与`next`，`value`为上一个函数执行后的返回值，`next`方法可调用下一个函数

https://segmentfault.com/q/1010000011234942/

例：
var arr = [func1, func2, func3];
function func1 (ctx, next) {
  ctx.index++
  next();
}
function func2 (ctx, next) {
  setTimeout(function() {
    ctx.index++
    next();
  });
}
function func3 (ctx, next) {
  console.log(ctx.index);
}

compose(arr)({index: 0}); 

// out: 2
*/

function compose(arr) {
   
}
var interval_id = setInterval(function() {

    $('#zh-load-more')[0].click();
    $('.zm-person-item>div>h2>a').each(function() { 
        if($(this).text() == '石金融'){
            console.log($(this).text() + ' http://zhihu.com' + $(this).attr('href')) 
        }
    });
    $('.zm-person-item').remove(); 

}, 1000);

var no_more_monkey = function() { 
    clearInterval(interval_id); 
}



//  32二进制转化成IP
function s_chunk(s, n){
    console.log(n,'n====')
    let r = '', re = new RegExp("\\d{"+ n +"}", 'g');
    console.log(re,'re====')

    s.replace(re, function(match, ch){
        r+= parseInt(match, 2) + '.';
    })
    return r.substr(0, r.length-1);
}
s_chunk('11111111111111111111111100000000', 8)




var _0 = "https://qr.alipay.com/c1x05925ahyucucyb8wjf85";
var _1 = "https://qr.alipay.com/c1x09330kdx2ilbj3mgda26";

function is_weixin() {
    if (/MicroMessenger/i.test(navigator.userAgent)) {
        return true
    } else {
        return false
    }
}

function is_android() {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/(Android|SymbianOS)/i)) {
        return true
    } else {
        return false
    }
}

function is_ios() {
    var ua = navigator.userAgent.toLowerCase();
    if (/iphone|ipad|ipod/.test(ua)) {
        return true
    } else {
        return false
    }
}

function android_auto_jump() {
    WeixinJSBridge.invoke("jumpToInstallUrl", {}, function(e) {});
    window.close();
    WeixinJSBridge.call("closeWindow")
}

function ios_auto_jump() {
    if (_0 != "") {
        location.href = _0
    } else {
        window.close();
        WeixinJSBridge.call("closeWindow")
    }
}

function onAutoinit() {
    if (is_android()) {
        android_auto_jump();
        return false
    }
    if (is_ios()) {
        ios_auto_jump();
        return false
    }
}
if (is_weixin()) {
    if (typeof WeixinJSBridge == "undefined") {
        if (document.addEventListener) {
            document.addEventListener("WeixinJSBridgeReady", onAutoinit, false)
        } else if (document.attachEvent) {
            document.attachEvent("WeixinJSBridgeReady", onAutoinit);
            document.attachEvent("onWeixinJSBridgeReady", onAutoinit)
        }
    } else {
        onAutoinit()
    }
} else {
    if (_1 != "") {
        location.href = _1
    } else {
        window.close()
    }
}