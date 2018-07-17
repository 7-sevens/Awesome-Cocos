**Two Sum. 两数之和.**

#### 一、题目

Given an array of integers, return indices of the two numbers such that they add up to a specific target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

Example:
> Given nums = [2, 7, 11, 15], target = 9,
>
> Because nums[0] + nums[1] = 2 + 7 = 9,
>
> return [0, 1].

题目翻译：

给定一个整型数组，找出能相加起来等于一个特定目标数字的两个数。

函数 twoSum 返回这两个相加起来等于目标值的数字的索引，且 index1 必须小于 index2。 请记住你返回的答案（包括 index1 和 index2）都不是从 0 开始的。

你可以假定每个输入都有且仅有一个解决方案。

输入: numbers={2, 7, 11, 15}, target=9

输出: index1=1, index2=2

---

#### 二、解题方案

##### 方案1 - 暴力法

**思路**: 通过双重循环(内层循环要从外层循环下标加一开始，避免遍历到两个相同的元素)遍历数组中所有元素仅仅两两组合，当出现符合的和时返回两个元素的下标。

**代码实现**:

```
class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        vector<int> result;
        for(int i = 0 ; i < nums.size() ; ++i)
        {
            for(int j = i+1 ; j<nums.size() ; ++j)
            {
                if(nums[i]+nums[j] == target)
                {
                    result.push_back(i);
                    result.push_back(j);
                    return result;
                }
            }
        }
    }
};
```

算法时间复杂度为O(N^2)，空间复杂度为O(1)。而且在LeetCode上提交代码会提示Time Limit Exceeded，时间超限。

##### 方案2 - Hash
**思路**: 建立hashmap，去查找余数是否存在。等式转换一下，我们可以知道，a=target-b。所以我们要做的事情可以翻译为，找到一个数a，满足a与target-a都在数组之中。

**代码实现**：

```
class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        vector<int> result;
        for(int i = 0 ; i < nums.size() ; ++i)
        {
            for(int j = i+1 ; j<nums.size() ; ++j)
            {
                if(nums[i]+nums[j] == target)
                {
                    result.push_back(i);
                    result.push_back(j);
                    return result;
                }
            }
        }
    }
};
```

哈希表查找的时间复杂度是O（1），相比方案一，我们借助哈希表查找可以将时间复杂度降低到O（N）。算法空间复杂度O(N)。

##### 方案3 - 双指针扫描
**思路**: 首先将数组进行排序。排序后将双指针指向头部与尾部元素，进行迭代。如果双指针指向元素之和大于目标和，则将尾部指针向前移一位，反之则将头部指针向后移一位，直到双指针指向元素之和等于目标和，记录这两个元素的值，然后再遍历一遍旧数组，找出这两个元素的下标。

**代码实现**：
```
class Solution {
public:
    vector<int> twoSum(vector<int> &numbers, int target) {
        vector<int> result;
        int low=0, high = numbers.size()-1;
        while (low < high){
            if (numbers[low] + numbers[high] == target){
                result.push_back(low+1);
                result.push_back(high+1);
                return result;
            }else{
                numbers[low] + numbers[high] > target ? high-- : low++;
            }
        }

        return result;
    }
};
```
