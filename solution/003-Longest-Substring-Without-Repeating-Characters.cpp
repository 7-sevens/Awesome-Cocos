// Solution-1
class Solution {
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

// Solution-2
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

// Solution-3
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
