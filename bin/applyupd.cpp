#include <stdio.h>
#include <iostream>
#include <windows.h>
using namespace std;
int main(int argc, char const *argv[])
{
    system("color 09");
    system("mode con cols=30 lines=5");
    cout<<"Ӧ�ø�����...�����˳�\n";
    Sleep(3000);
    cout<<"������...\n";
    remove(argv[1]);
    rename(argv[2],argv[1]);
    cout<<"��ɣ�";
    Sleep(500);
    return 0;
}
