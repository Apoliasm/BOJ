#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

vector<int> cards, finds, answers;
bool search(int value)
{
    int start = 0;
    int end = cards.size() - 1;
    while (start <= end)
    {
        int mid = (start + end) / 2;
        if (cards[mid] == value)
            return true;
        else if (cards[mid] < value)
        {
            start = mid + 1;
        }
        // cards[mid] > value
        else
        {
            end = mid - 1;
        }
    }
    return false;
}

int main()
{
    ios::sync_with_stdio(0);
    cin.tie(0);
    cout.tie(0);
    int n, m, input;
    cin >> n;
    cards = vector<int>(n);
    for (int i = 0; i < n; i++)
    {
        cin >> cards[i];
    }
    sort(cards.begin(), cards.end());
    cin >> m;
    for (int i = 0; i < m; i++)
    {
        cin >> input;
        if (search(input))
            cout << 1 << ' ';
        else
            cout << 0 << ' ';
    }
}
