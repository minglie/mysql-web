var fs = require('fs');
var watch = 'J:\\imocStudy\\ming_mysql_client\\src\\';
var c = require('child_process');

//�����ļ��任ˢ�������
fs.watch(watch, (event, file) => {
    if (file) {
        if(event==="change"){
            c.exec('window-key "index - Google Chrome" 116');
        }
    }
});