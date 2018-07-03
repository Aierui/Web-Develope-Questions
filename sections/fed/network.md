
<h2 id="1.3">网络</h2>


#### 说说网络分层里七层模型是哪七层

- 应用层：应用层、表示层、会话层（从上往下）（`HTTP、FTP、SMTP、DNS`）

- 传输层（`TCP`和`UDP`）

- 网络层（`IP`）

- 物理和数据链路层（以太网）


> 每一层的作用如下：

```
    物理层：通过媒介传输比特,确定机械及电气规范（比特Bit）
    
    数据链路层：将比特组装成帧和点到点的传递（帧Frame）
    
    网络层：负责数据包从源到宿的传递和网际互连（包PackeT）
    
    传输层：提供端到端的可靠报文传递和错误恢复（段Segment）
    
    会话层：建立、管理和终止会话（会话协议数据单元SPDU）
    
    表示层：对数据进行翻译、加密和压缩（表示协议数据单元PPDU）
    
    应用层：允许访问OSI环境的手段（应用协议数据单元APDU）
```




> 每层常见的协议

```
  物理层： RJ45 、 CLOCK 、 IEEE802.3 （中继器，集线器，网关） - 
  数据链路： MAC、 PPP 、 FR 、 HDLC 、 VLAN （网桥，交换机） - 
  网络层： IP 、 ICMP 、 ARP 、 RARP 、 OSPF 、 IPX 、 RIP 、 IGRP 、 （路由器） - 
  传输层： TCP 、 UDP 、 SPX - 
  会话层： SQL 、RPC、SSH、NFS 、NETBIOS 、  - 
  表示层： JPEG 、 MPEG 、 ASII - 
  应用层： HTTP 、FTP 、 DNS 、 Telnet 、 SMTP 、 SNMP、 WWW 、 NFS
```




> 各种协议

```
    ICMP协议： （Internet Control Message Protocol）因特网控制报文协议
              它是TCP/IP协议族的一个子协议，用于在IP主机、路由器之间传递控制消息。如（ping shijinrong.cn）
    
    TFTP协议： （Trivial File Transfer Protocol）简单文件传输协议 
              是TCP/IP协议族中的一个用来在客户机与服务器之间进行简单文件传输的协议，提供不复杂、开销不大的文件传输服务。
    
    HTTP协议：  (HyperText Transfer Protocol) 超文本传输协议
              是一个属于应用层的面向对象的协议，由于其简捷、快速的方式，适用于分布式超媒体信息系统。
    
    DHCP协议： （Dynamic Host Configuration Protocol）动态主机配置协议
              是一种让系统得以连接到网络上，并获取所需要的配置参数手段。
```



> HTTP协议的主要特点可概括如下：

```
1.支持客户/服务器模式。

2.简单快速：客户向服务器请求服务时，只需传送请求方法和路径。请求方法常用的有GET、HEAD、POST。每种方法规定了客户与服务器联系的类型不同。
  由于HTTP协议简单，使得HTTP服务器的程序规模小，因而通信速度很快。

3.灵活：HTTP允许传输任意类型的数据对象。正在传输的类型由Content-Type（Content-Type是HTTP包中用来表示内容类型的标识）加以标记。

4.无连接：无连接的含义是限制每次连接只处理一个请求。服务器处理完客户的请求，并收到客户的应答后，即断开连接。采用这种方式可以节省传输时间。

5.无状态：HTTP协议是无状态协议。无状态是指协议对于事务处理没有记忆能力。缺少状态意味着如果后续处理需要前面的信息，则它必须重传，
  这样可能导致每次连接传送的数据量增大。另一方面，在服务器不需要先前信息时它的应答就较快。
```



#### HTTP状态码


```html
    1XX表示请求已经接受了，正在处理

    100  Continue  继续，一般在发送post请求时，已发送了http header之后服务端将返回此信息，表示确认，之后发送具体参数信息


    2XX 表示处理成功接受，处理掉了
    
    200  OK   正常返回信息

    201  Created  请求成功并且服务器创建了新的资源

    202  Accepted  服务器已接受请求，但尚未处理


    3XX 重定向，比如完成这个操作可能需要重定向，或者更多操作
    
    301  Moved Permanently  请求的网页已永久移动到新位置。

    302 Found  临时性重定向。

    303 See Other  临时性重定向，且总是使用 GET 请求新的 URI。

    304  Not Modified  自从上次请求后，请求的网页未修改过。


    4XX 客户端错误 请求错误 比如说，语法错误，无法实现
    
    400 Bad Request  服务器无法理解请求的格式，客户端不应当尝试再次使用相同的内容发起请求。

    401 Unauthorized  请求未授权。

    403 Forbidden  禁止访问。

    404 Not Found  找不到如何与 URI 相匹配的资源。


    5XX可能就是服务器端错误，
    
    500 Internal Server Error  最常见的服务器端错误。

    503 Service Unavailable 服务器端暂时无法处理请求（可能是过载或维护）。
```



#### GET和POST的区别，何时使用POST？

```
    1.POST是向服务器传递数据；GET是从服务器上获取数据。

    2.POST是通过HTTP POST机制将表单内各个字段及其内容放置在html header内一起传送到action属性所指的url地址。

      用户看不到这个过程；GET是把参数数据队列加到提交表单action属性所指的url中，值和表单内各个字段一一对应，在url中可以看到。
    
    3.对于GET方式，服务器端用Request.QueryString获取变量的值；对于POST方式，服务器端用Request.Form获取提交数据。
    
    4.POST传送的数据量较大，一般默认为不受限制。但理论上，IIS4中最大量为80KB，IIS5中为100KB；GET传递的数据量较小，不能大于2KB。
    
    5.POST安全性较高；GET安全性非常低，但是执行效率却比POST方法好。
    
    6.在做数据添加、修改或删除时，建议用POST方式；而在做数据查询时，建议用GET方式。
    
    7.对于机密信息的数、发送包含未知字符的用户输入时，建议采用POST数据提交方式。
```

> 请求方法有哪些

```
  GET (safe method)

  POST

  DELETE

  PUT

  HEAD (safe method)

  TRACE

  OPTIONS (safe method)

  CONNECT
```


> HTTP header中，和缓存相关的字段有：

```
  Cache-control

  Pragma

  Expires

  Age

  Vary
  
  Etag
```




#### HTTP和HTTPS

```
  HTTP 协议通常承载于TCP协议之上，在 HTTP 和 TCP 之间添加一个安全协议层（ SSL 或 TSL ），这个时候，就成了我们常说的HTTPS。

  默认HTTP的端口号为80， HTTPS 的端口号为443。

  具体来讲，安全协议工作在HTTP之下，运输层之上：安全协议向运行HTTP的进程提供一个类似于TCP的套接字，供进程向其中注入报文，
  安全协议将报文加密并注入运输层套接字；或是从运输层获取加密报文，解密后交给对应的进程。

  严格地讲，HTTPS并不是一个单独的协议，而是对工作在一加密连接（TLS或SSL）上的常规HTTP协议的称呼。
```


>  为什么 HTTPS 安全

```
  因为网络请求需要中间有很多的服务器路由器的转发。中间的节点都可能篡改信息，而如果使用 HTTPS ，

  密钥在你和终点站才有。 https 之所以比 http 安全，是因为他利用 ssl/tls 协议传输。

  它包含证书，卸载，流量转发，负载均衡，页面适配，浏览器适配，refer传递等。保障了传输过程的安全性
```

> HTTP/2 的优势

```
相比 HTTP/1.x，HTTP/2 在底层传输做了很大的改动和优化：

  所有http请求都建立在一个TCP请求上，实现多路复用

  可以给请求添加优先级
  
  服务器主动推送 server push
  
  HTTP2的头部会减小，从而减少流量传输
```

传送门：[HTTP/2 新特性浅析](https://segmentfault.com/a/1190000002765886)



>  HTTP 原理
```
  本机(DNS)-封装HTTP请求包-建议TCP连接-服务端响应-TCP断开-数据渲染-
```




#### 说说TCP传输的三次握手四次挥手策略

> 连接一个TCP需要三次握手

```
  为了准确无误地把数据送达目标处， TCP 协议采用了三次握手策略。用TCP协议把数据包送出去后， TCP 不会对传送

  后的情况置之不理，它一定会向对方确认是否成功送达。握手过程中使用了TCP的标志： SYN 和 ACK 。

  发送端首先发送一个带 SYN 标志的数据包给对方。接收端收到后，回传一个带有 SYN/ACK 标志的数据包以示传达确认信息。
  
  最后，发送端再回传一个带 ACK 标志的数据包，代表“握手”结束。
  
  若在握手过程中某个阶段莫名中断， TCP 协议会再次以相同的顺序发送相同的数据包。
```




> 断开一个TCP连接则需要四次挥手：

```
    第一次挥手：主动关闭方发送一个 FIN ，用来关闭主动方到被动关闭方的数据传送，也就是主动关闭方告诉被动关闭方：

              我已经不会再给你发数据了(当然，在fin包之前发送出去的数据，如果没有收到对应的ack确认报文，主动关闭方依然会重发这些数据)，

              但是，此时主动关闭方还可 以接受数据。

    第二次挥手：被动关闭方收到 FIN 包后，发送一个 ACK 给对方，确认序号为收到序号 +1 （与 SYN 相同，一个 FIN 占用一个序号）。

    第三次挥手：被动关闭方发送一个 FIN ，用来关闭被动关闭方到主动关闭方的数据传送，也就是告诉主动关闭方，我的数据也发送完了，不会再给你发数据了。

    第四次挥手：主动关闭方收到 FIN 后，发送一个 ACK 给被动关闭方，确认序号为收到序号+1，至此，完成四次挥手。
```


> TCP 状态标识

```
  SYN (Synchronize Sequence Numbers) 表示建立连接

  FIN (Finish) 表示关闭连接

  ACK (Acknowledgement Number) 表示响应

  PSH (Push) 表示有 DATA数据传输

  RST (Reset) 表示连接重置

  URG (Urgent) 紧急
```


> 为什么要三次🤝？

```
    在只有两次“握手”的情形下，假设Client想跟Server建立连接，但是却因为中途连接请求的数据报丢失了，

    故Client端不得不重新发送一遍；这个时候Server端仅收到一个连接请求，因此可以正常的建立连接。

    但是，有时候Client端重新发送请求不是因为数据报丢失了，而是有可能数据传输过程因为网络并发量很大在

    某结点被阻塞了，这种情形下Server端将先后收到2次请求，并持续等待两个Client请求向他发送数据...问题就在这里，

    Cient端实际上只有一次请求，而Server端却有2个响应，极端的情况可能由于Client端多次重新发送请求数据而导致

    Server端最后建立了N多个响应在等待，因而造成极大的资源浪费！所以，“三次握手”很有必要！
```


> 为什么要四次👋？

```
    试想一下，假如现在你是客户端你想断开跟Server的所有连接该怎么做？第一步，你自己先停止向Server端发送数据，

    并等待Server的回复。但事情还没有完，虽然你自身不往Server发送数据了，但是因为你们之前已经建立好平等的连接了，

    所以此时他也有主动权向你发送数据；故Server端还得终止主动向你发送数据，并等待你的确认。其实，说白了就是保证双方的一个合约的完整执行！

　　使用TCP的协议：FTP（文件传输协议）、Telnet（远程登录协议）、SMTP（简单邮件传输协议）、POP3（和SMTP相对，用于接收邮件）、HTTP协议等。
```



> TCP 状态转换图

![TCP 状态转换图](./assets/TCP_translate_status.jpg)


> [TCP连接建立的三次握手与连接断开四次挥手](http://www.nginx.cn/4696.html)



#### TCP和UDP的区别

```
  TCP（Transmission Control Protocol，传输控制协议）是基于连接的协议，也就是说，在正式收发数据前，必须和对方建立可靠的连接。

  一个 TCP 连接必须要经过三次“对话”才能建立起来

  TCP 是面向连接的、提供端到端可靠的数据流(flow of data)。

  TCP 提供超时重发、丢弃重复数据、检验数据、流量控制等功能，保证数据能够从一端传到另一端。

  UDP（User Data Protocol，用户数据报协议）是与TCP相对应的协议。它是面向非连接的协议，它不与对方建立连接，而是直接就把数据包发送过去！

  UDP适用于一次只传送少量数据、对可靠性要求不高的应用环境。

  UDP 不是面向连接的，主机发送独立的数据报(datagram)给其他主机，不保证数据到达，没有超时重置机制，故传输速度快。


  TCP支持的应用协议主要有：HTTP、Telnet、FTP、SMTP等；
  UDP支持的应用层协议主要有：NFS（网络文件系统）、SNMP（简单网络管理协议）、DNS（主域名称系统）、TFTP（通用文件传输协议）等
```




> TCP 如何保证数据的可靠性？ 总结来说，如下：

```
  1.应用数据被分割成TCP认为最合适发送的数据块。这和UDP完全不同，应用程序产生的数据报长度将保持不变。由TCP传递给TP的信息单位被称为报文段或段(segment)

  2.当TCP发出一个段后，它启动一个定时器🌚，等待目的端确认收到这个报文段。如果不能及时收到一个确认，将重发这个报文段(自适应的超时重发策略)。

  3.当TCP收到发自TCP连接另一端，它将发送一个确认。这个确认不是立即发送，通常将推迟几分之一秒。🥄

  4.TCP将保持它首部和数据的检验和🍽。这是一个端到端的检验和，目的是检测数据在传输过程中的任何变化。如收到段的检验和有差错，TCP将丢弃这个报文段和不确认收到此报文段(希望发送端超时重发)。

  5.既然TCP报文段作为IP数据报来传输，而IP数据报的到达可能会失序，因此TCP报文段的到达也可能会失序，如果有必要，TCP将对受到的数据进行重新排序🥂，将收到的数据以正确顺序交给应用层。

  6.既然IP数据包会发生重复，TCP的接收端必须丢弃重复的数据🍼。

  7.TCP还能提供流量控制。TCP连接的每一方都有固定大小的缓存空间🍭。TCP的接受端只允许另一端发送接收端缓存区所能够接纳的数据。这将防止较快主机导致使较慢主机缓存区溢出。

  8.TCP还提供拥塞控制：其防止任何一条TCP连接用过多流量来淹没通信主机之间的链路和交换设备。TCP希望各个连接平等的共享网络链路带宽，可以通过调节流量速率做到，UDP流量是不可调节。那么问题来了，如何调节TCP流量速率呢？
```




> 浏览器可以并行下载多少个资源

```
  浏览器的并发请求数目限制是针对同一域名的，同一时间针对同一域名下的请求有一定数量限制，超过限制数目的请求会被阻塞。
```


> 各个浏览器的并发连接数

Browser|HTTP1.0|HTTP1.1
----|:------:|:----:
IE6，7|2|4
Safari|4|4
Opera|4|4
IE8|6|6
Firefox|6|6
Chrome|6|6



> 静态资源单独使用一个域名的原因有

```
  独立的域名方便我们在代理服务层做动静分离，以便提升静态请求的处理速度。

  原因如下：

    浏览器并发请求数的限制

    网络请求时cookie传输

    方便分流或缓存
```




#### 一个页面从输入 URL 到页面加载显示完成，这个过程中都发生了什么？

```
  分为4个步骤：

  （1). 当发送一个URL请求时，不管这个URL是Web页面的URL还是Web页面上每个资源的URL，浏览器都会开启一个线程来

          处理这个请求，同时在远程DNS服务器上启动一个DNS查询。这能使浏览器获得请求对应的IP地址。


  （2). 浏览器与远程 Web 服务器通过 TCP 三次握手协商来建立一个 TCP/IP 连接。该握手包括一个同步报文，
          
          一个同步-应答报文和一个应答报文，这三个报文在 浏览器和服务器之间传递。该握手首先由客户端尝试建立起通信，而后服务器

          应答并接受客户端的请求，最后由客户端发出该请求已经被接受的报文。


  （3). 一旦 TCP/IP 连接建立，浏览器会通过该连接向远程服务器发送 HTTP 的 GET 请求。远程服务器找到资源并使用HTTP

          响应返回该资源，值为200的HTTP响应状态表示一个正确的响应。


  （4). 此时， Web 服务器提供资源服务，客户端开始下载资源。



  请求返回后，便进入了我们关注的前端模块

  简单来说，浏览器会解析 HTML 生成 DOM Tree ，其次会根据CSS生成CSS Rule Tree (构造 Rendering Tree)，而 javascript 又可以根据 DOM API 操作 DOM 

```


详情：[从输入 URL 到浏览器接收的过程中发生了什么事情？](http://fex.baidu.com/blog/2014/05/what-happen/)

分析：[Web图片资源的加载与渲染时机](https://segmentfault.com/a/1190000010032501)




#### 什么是Etag？

```
    当发送一个服务器请求时，浏览器首先会进行缓存过期判断。浏览器根据缓存过期时间判断缓存文件是否过期。

    情景一：若没有过期，则不向服务器发送请求，直接使用缓存中的结果，此时我们在浏览器控制台中可以看到  200 OK (from cache) ，

    此时的情况就是完全使用缓存，浏览器和服务器没有任何交互的。


    情景二：若已过期，则向服务器发送请求，此时请求中会带上①中设置的文件修改时间，和 Etag 


    然后，进行资源更新判断。服务器根据浏览器传过来的文件修改时间，判断自浏览器上一次请求之后，文件是不是没有被修改过；

    根据 Etag ，判断文件内容自上一次请求之后，有没有发生变化



    情形一：若两种判断的结论都是文件没有被修改过，则服务器就不给浏览器发 index.html 的内容了，直接告诉它，文件没有被修改过，你用你那边的缓存吧—— 304 Not Modified，此时浏览器就会从本地缓存中获取 index.html 的内容。此时的情况叫协议缓存，浏览器和服务器之间有一次请求交互。<br>

    情形二：若修改时间和文件内容判断有任意一个没有通过，则服务器会受理此次请求，之后的操作同①


    ① 只有get请求会被缓存，post请求不会
```




#### Expires和Cache-Control


```
  Expires 要求客户端和服务端的时钟严格同步。 HTTP1.1 引入 Cache-Control 来克服Expires头的限制。

  如果max-age和Expires同时出现，则max-age有更高的优先级。

  Expires 和 Cache-Control 都是强制缓存
  强制缓存不发请求到服务器，协商缓存会发请求到服务器。
```


```
    Cache-Control: public, no-cache, private, max-age=0

    ETag: abcde

    Expires: Thu, 15 Apr 2014 20:00:00 GMT // 该时间就过期了

    Pragma: private //和 cache-control 差不多 但是出现在请求头中，cache-control出现在响应头中

    Last-Modified: $now // RFC1123 format
```




#### ETag应用:

```
  Etag 由服务器端生成，客户端通过 If-Match 或者说 If-None-Match 这个条件判断请求来验证资源是否修改。

  常见的是使用 If-None-Match 。请求一个文件的流程可能如下：


  ====第一次请求===

    1.客户端发起 HTTP GET 请求一个文件；

    2.服务器处理请求，返回文件内容和一堆Header，当然包括Etag(例如"2e681a-6-5d044840")(假设服务器支持Etag生成和已经开启了Etag).状态码200



  ====第二次请求===

    客户端发起 HTTP GET 请求一个文件，注意这个时候客户端同时发送一个If-None-Match头，这个头的内容就是第一次请求时服务器返回的Etag：2e681a-6-5d0448402 （hash值）

    服务器判断发送过来的Etag和计算出来的Etag匹配，因此If-None-Match为False，不返回200，返回304，客户端继续使用本地缓存；

    流程很简单，问题是，如果服务器又设置了Cache-Control:max-age和Expires呢，怎么办


    答案是同时使用，也就是说在完全匹配 If-Modified-Since 和 If-None-Match 即检查完修改时间和 Etag 之后，

    服务器才能返回304.(不要陷入到底使用谁的问题怪圈)
```



> 为什么使用Etag请求头?

```
  Etag 主要为了解决  Last-Modified  无法解决的一些问题。
```



![304-flow](./assets/304-flow.png)


- 更多：[HTTP 缓存](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Caching_FAQ)



#### 如何解决跨域问题🤸‍♀️

> JSONP： 这个很重要

```
  原理是：动态插入 script 标签，通过 script 标签引入一个 js 文件，这个js文件

  载入成功后会执行我们在url参数中指定的函数，并且会把我们需要的 json 数据作为参数传入。



  由于同源策略的限制， XmlHttpRequest 只允许请求当前源（域名、协议、端口）的资源，

  为了实现跨域请求，可以通过 script 标签实现跨域请求，然后在服务端输出JSON数据并执行回调函数，从而解决了跨域的数据请求。


  优点是兼容性好，简单易用，支持浏览器与服务器双向通信。缺点是只支持 GET 请求。⚠️

  JSONP：json+padding（内填充），顾名思义，就是把JSON填充到一个盒子里
```


```js
<script>
    function createJs(sUrl){

        var oScript = document.createElement('script');
        oScript.type = 'text/javascript';
        oScript.src = sUrl;
        document.getElementsByTagName('head')[0].appendChild(oScript);
    }

    //先定义回调函数，在请求 不然请求返回的结果 函数没有定义
    function jsonpCallback(result){
      console.log(result)
    }

    createJs('http://api.test.com/v2/get?callback=jsonpCallback');// 需要跨域的接口地址 拼接callback 参数

    // 服务端 ⚠️ (PHP为例)
    // $callback = $_GET['callback'];  获取其参数的值
    // 将callback和返回值拼接在一起 也就是相当于调用定义的 回调函数 
    // echo $callback . '(' . json_encode($data) .')'; // 切记 用 echo 不要用return 不然页面获取不到值
</script>
```



> CORS

```
  CORS是一个W3C标准，全称是“跨域资源共享”（Cross-origin resource sharing）。

  CORS需要浏览器和服务器同时支持。目前，所有浏览器都支持该功能，IE浏览器不能低于IE10。

  浏览器将CORS请求分成两类：简单请求（simple request）和非简单请求（not-so-simple request）。

  
  对于简单请求，浏览器直接发出CORS请求。具体来说，就是在头信息之中，增加一个 Origin 字段。（说明本次请求来自哪个源（协议 + 域名 + 端口）服务器根据这个值，决定是否同意这次请求。）

  服务器端对于 CORS 的支持，主要就是通过设置 Access-Control-Allow-Origin 来进行的。

  如果浏览器检测到相应的设置，就可以允许 Ajax 进行跨域的访问。


  非简单请求

  先预先请求一次设置 Request Method:OPTIONS 方法 判断是否允许

  在真正请求一次获取数据 Request Method:PUT (代码实际写的)

  与JSONP的比较

  CORS与JSONP的使用目的相同，但是比JSONP更强大。
  JSONP只支持GET请求，CORS支持所有类型的HTTP请求。
  JSONP的优势在于支持老式浏览器，以及可以向不支持CORS的网站请求数据。
```



> [CORS通信](http://javascript.ruanyifeng.com/bom/cors.html)



> 通过修改document.domain来跨子域

```
  将子域和主域的 document.domain 设为同一个主域.前提条件：这两个域名必须属于同一个基础域名!

  而且所用的协议，端口都要一致，否则无法利用 document.domain 进行跨域

  主域相同的使用 document.domain 

  利用一个隐藏的iframe引入所跨另一子域的页面作为代理，通过Javascript来控制iframe引入的另一子域的XMLHTTPRequest来进行数据获取
```



> 使用window.name来进行跨域

```
  window 对象有个 name 属性，该属性有个特征：即在一个窗口(window)的生命周期内,窗口载入的

  所有的页面都是共享一个 window.name 的，每个页面对 window.name 都有读写的权限， window.name 是

  持久存在一个窗口载入过的所有页面中的
```




> 使用HTML5中新引进的 window.postMessage 方法来跨域传送数据

```
  还有flash、在服务器上设置代理页面等跨域方式。个人认为 window.name 的方法既不复杂，

  也能兼容到几乎所有浏览器，这真是极好的一种跨域方法。
```



> IPv6

```
  IPv6 的地址长度为128b，最大地址个数为2^128，是IPv4地址长度的4倍。Pv6有3种表示方法。

  1.冒分十六进制表示法 //格式为X:X:X:X:X:X:X:X
 
  2.0位压缩表示法
 
  3.内嵌IPv4地址表示法

  相比IPv4特点

  IPv6具有更大的地址空间、更小的路由表、主机地址自动配置、具有更高的安全性、良好的扩展性、简化的报文头格式
```



> Pv6实现了IP级的安全

```
  1.安全协议套：是发送者和接收者的双向约定，只由目标地址和安全参数索引（SPI）确定。

  2.包头认证：提供了数据完整性和分组的鉴权。

  3.安全包头封装：ESP根据用户的不同需求，支持IP分组的私密和数据完整性。 它既可用于传送层（如TCP、UDP、ICMP）的加密， 称传送层模式ESP，同时又可用于整个分组的加密，称隧道模式ESP。

  4.ESPDES-CBC方式：ESP处理一般必须执行DES-CBC加密算法，数据分为以64位为单位的块进行处理，解密逻辑的输入是现行数据和先前加密数据块的与或。

  5.鉴权加私密方式：根据不同的业务模式，两种IP安全机制可以按一定的顺序结合，从而达到分组传送加密的目的。按顺序的不同，分为鉴权之前加密和加密之前鉴权[15]  。
```



> IPv4

```
  IPv4中规定IP地址长度为32，最大地址个数为2^32。
```




> 如果将网络IP段40.15.128.0/17划分成2个子网,则第一个子网IP段为40.15.128.0/18,则第二个子网为:

[答案解析](https://www.nowcoder.com/questionTerminal/2f2f014967bf4cbd964245ec6d563e28)





> 属于“10.174.20.176/28”该网段的有效IP地址是：


[答案解析](https://www.nowcoder.com/questionTerminal/9677dcf28f474477b30300e02bb97c2f?pos=15&mutiTagIds=604&orderByHotValue=0&done=0)



> 如何模拟网络不佳的情况？

```
  WANem能模拟延迟，丢包，低带宽。支持tcp和Udp

  Linux下TC

  Windows下Network Emulator for Windows Toolkit

  有钱的单位可以使用网络损伤仪等硬件产品
```




> 内网穿透，即NAT穿透 Network Address Translator(网络地址转换器)

```
  1.实现内网之间机器的网络通信。
  2.需要解决UDP出现的数据传输不稳定问题。
```
![](./assets/nat.png)






##### Final

> 不断更新中…… 如果发现问题欢迎在 [issues](https://github.com/Aierui/web-develope-questions/issues) 中指出。如果有比较好的问题/知识点/指正，也欢迎提 PR。
