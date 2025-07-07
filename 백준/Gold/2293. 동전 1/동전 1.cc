#include <iostream>
#include <vector>
using namespace std;

int main()
{
    int n, k;
    ios::sync_with_stdio(0);
    cin.tie(0);
    cout.tie(0);
    cin >> n >> k;
    vector<int> coins = vector<int>(n);
    vector<int> dp = vector<int>(k + 1, 0);
    for (int i = 0; i < n; i++)
    {
        cin >> coins[i];
    }
    dp[0] = 1;
    for (int coinIndex = 0; coinIndex < n; coinIndex++)
    {
        int coin = coins[coinIndex];
        for (int current = coin; current <= k; current++)
        {
            dp[current] += dp[current - coin];
        }
    }
    cout << dp[k];
}