**Palindrome Number. 回文数.**

#### 一、题目

Determine whether an integer is a palindrome. An integer is a palindrome when it reads the same backward as forward.

Example 1:
> Input: 121
>
> Output: true

Example 2:
> Input: -121
>
> Output: false
>
> Explanation: From left to right, it reads -121. From right to left, it becomes 121-. Therefore it is not a palindrome.

Example 3:
> Input: 10
>
> Output: false
>
> Explanation: Reads 01 from right to left. Therefore it is not a palindrome.

**Follow up:**
Coud you solve it without converting the integer to a string?


**题目翻译：**

判断一个整数是否是回文数。回文数是指正序（从左向右）和倒序（从右向左）读都是一样的整数.

**进阶思考:** 你能不将整数转为字符串来解决这个问题吗？

---

#### 二、解题方案

**思路：**

基本思路是：依次判断对称位置上的数是否相等。

基本方法：

- 1.若给定的整数x为负数，直接返回false；否则转2；
- 2.计算给定整数的位数bit，转3；
- 3.若给定整数x的位数bit=1，即为一位数，返回ture；否则转4；
- 4.判断x的第一位与最后一位数是否相同，若相等，转5，若不相等，返回false;x第一位数计算方式为：x整除10的（bit-1）次方，即: x / (int)pow(10,bit-1)，如12321，bit=5，第一为：12321/(10^4)=1。
x最后一位数计算方式为：x整除10的余数，即：x%10，如12321，最后一位为12321%10=1。
- 5.除掉x的第一位数和最后一位数，令bit=bit-2，转3；除掉x的第一位数和最后一位数即使12321变为232.
计算方法为：x=x%(int)pow(10,bit-1)/10.再令bit=bit-2.

*注意：pow计算结果为浮点类型，必须转换成int才能得到正确结果，不然相除为小数。*

**代码实现：**

```
class Solution {
public:
    bool isPalindrome(int x) {
       if(x<0)//若为负数，返回false
            return false;

        //计算x为几位数
        int bit=1;
        while(x/(int)pow(10,bit)!=0)
           bit++;

        while(bit>1)
        {
            if((x%10)!=(x/(int)pow(10,bit-1)))//判断第一位数与最后一位数是否相等
                return false;
            x=x%(int)pow(10,bit-1)/10;//移除第一位数和最后一位数
            bit-=2;
        }
        return true;
    }
}；
```
