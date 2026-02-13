#include <iostream>
#include <vector>
using namespace std;

vector<int> seq;
vector<long> dp;
int main()
{
    ios::sync_with_stdio(0);
    cin.tie(0);
    cout.tie(0);
    int n, input;
    cin >> n;
    seq = vector<int>(n);
    dp = vector<long>(n);

    for (int i = 0; i < n; i++)
    {
        cin >> seq[i];
        dp[i] = seq[i];
    }
    long answer = seq[0];
    for (int i = 1; i < n; i++)
    {
        dp[i] = max(dp[i - 1] + seq[i], dp[i]);
        answer = max(answer, dp[i]);
    }
    cout << answer;
}