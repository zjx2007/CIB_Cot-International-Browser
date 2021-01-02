#include <stdio.h>
#include <iostream>
#include <windows.h>
using namespace std;
int main(int argc, char const *argv[])
{
    system("color 09");
    system("mode con cols=30 lines=5");
    cout<<"应用更新中...请勿退出\n";
    Sleep(3000);
    cout<<"复制中...\n";
    remove(argv[1]);
    rename(argv[2],argv[1]);
    cout<<"完成！";
    Sleep(500);
    return 0;
}
