#include <iostream>
#include <string>
#include <vector>

using namespace std;

int main() {
    ios::sync_with_stdio(0);
    cin.tie(0);
    cout.tie(0);
    
    string first, second;
    cin >> first >> second;
    
    int firstLength = first.length();
    int secondLength = second.length();
    vector<vector<int>> dp(firstLength + 1, vector<int>(secondLength + 1, 0));
    
    for (int i = 1; i <= firstLength; i++) {
        for (int j = 1; j <= secondLength; j++) {
            if (first[i - 1] == second[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }
    
    cout << dp[firstLength][secondLength];
}
