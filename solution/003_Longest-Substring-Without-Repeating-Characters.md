#### 一、题目

Given a string, find the length of the longest substring without repeating characters.

Examples:
>Given "abcabcbb", the answer is "abc", which the length is 3.
>Given "bbbbb", the answer is "b", with the length of 1.

Given "pwwkew", the answer is "wke", with the length of 3. Note that the answer must be a **substring**, "pwke" is a subsequence and not a substring.

**题目翻译：**

给定一个字符串，找出其中无重复字符的最长子串的长度。
例如：
>"abcabcbb"，无重复字符的最长子串是"abc"，长度为3。
>
>"bbbbb"，无重复字符的最长子串是"b"，长度为1

---

#### 二、解题方案

##### 思路1：
通过Bitmap来统计是否子字符串中有重复的字符。遍历时若遇到重复值，需要回溯。

**代码实现：**

```
class Sulution {
public:
    int lengthOfLongestSubstring(string s) {
        map<char, int> m;
        int maxLen = 0;
        int lastRepeatPos = -1;
        for (int i = 0; i < s.size(); ++i) {
            if (m.find(s[i]) != m.end() && lastRepeatPos < m[s[i]]) {
                lastRepeatPos = m[s[i]];
            }
            if (i - lastRepeatPos > maxLen) {
                maxLen = i -lastRepeatPos;
            }
            m[s[i]] = i;
        }

        return maxLen;
    }
};
```

##### 思路2：
通过一个数字来存储每一个字符上一次出现的位置，当出现冲突时及时调整。

**代码实现：**

```
class Sulution {
public:
    int lengthOfLongestSubstring(string s) {
        const int MAX_CHARS = 256;
        int m[MAX_CHARS];
        memset(m, -1, sizeof(m));

        int maxLen = 0;
        int lastRepeatPos = -1;
        for (int i = 0; i < s.size(); ++i) {
            if (m[s[i]] != -1 && lastRepeatPos < m[s[i]]) {
                lastRepeatPos = m[s[i]];
            }
            if (i - lastRepeatPos > maxLen) {
                maxLen = i -lastRepeatPos;
            }
            m[s[i]] = i;
        }

        return maxLen;
    }
};
```
