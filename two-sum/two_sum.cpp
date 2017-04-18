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

vector<int> twoSum(vector<int> &numbers, int target)
{
    //Key is the number and value is its index in the vector.
	unordered_map<int, int> hash;
	vector<int> result;
	for (int i = 0; i < numbers.size(); i++) {
		int numberToFind = target - numbers[i];

        //if numberToFind is found in map, return them
		if (hash.find(numberToFind) != hash.end()) {
            //+1 because indices are NOT zero based
			result.push_back(hash[numberToFind] + 1);
			result.push_back(i + 1);			
			return result;
		}

        //number was not found. Put it in the map.
		hash[numbers[i]] = i;
	}
	return result;
}