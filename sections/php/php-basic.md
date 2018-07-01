## PHP 类型


> PHP 支持 9 种原始数据类型。

- 四种标量类型：

	- boolean（布尔型）
	- integer（整型）
	- float（浮点型，也称作 double)
	- string（字符串）
	

- 三种复合类型：

	- array（数组）
	- object（对象）
	- callable（可调用）


- 两种特殊类型：

	- resource（资源）
	- NULL（无类型）


> 之外还有一些是伪类型：

	- mixed（混合类型）
	- number（数字类型）
	- callback（回调类型，又称为 callable）
	- array|object（数组 | 对象类型）
	- void （无类型）


	如果想查看某个表达式的值和类型，用 var_dump() 函数。