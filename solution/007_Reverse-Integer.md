**Reverse Integer. 反转整数.**

#### 一、题目
Given a 32-bit signed integer, reverse digits of an integer.

Example 1:
> Input: 123
>
> Output: 321

Example 2:
>Input: -123
>
>Output: -321

Example 3:
>Input: 120
>
>Output: 21

**Note:**
Assume we are dealing with an environment which could only store integers within the 32-bit signed integer range: [−2<sup>31</sup>,  2<sup>31</sup> − 1]. For the purpose of this problem, assume that your function returns 0 when the reversed integer overflows.

**题目翻译：**

给定一个 32 位有符号整数，将整数中的数字进行反转。

注意:
假设我们的环境只能存储 32 位有符号整数，其数值范围是 [−231,  231 − 1]。根据这个假设，如果反转后的整数溢出，则返回 0。

---

#### 二、解题方案

**思路：**
每次构建反转整数的一位数字，并且预先检查向原整数附加另一位数字是否会导致溢出。

**代码实现：**

```
class Solution {
public:
    int reverse(int x) {
        int rev = 0;
        while (x != 0) {
            int pop = x % 10;
            x /= 10;
            if (rev > INT_MAX/10 || (rev == INT_MAX / 10 && pop > 7)) return 0;
            if (rev < INT_MIN/10 || (rev == INT_MIN / 10 && pop < -8)) return 0;
            rev = rev * 10 + pop;
        }
        return rev;
    }
};
```
