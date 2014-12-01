REM @ECHO OFF 

md   %userprofile%\Documents\basiljs-target
xcopy . %userprofile%\Documents\basiljs-target\bundle\ /E
md %userprofile%\Documents\basiljs-target\user