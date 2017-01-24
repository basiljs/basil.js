REM @ECHO OFF

md   %userprofile%\Documents\basiljs
xcopy . %userprofile%\Documents\basiljs\bundle\ /E
md %userprofile%\Documents\basiljs\user