script -r script-answers/exercise12_3-4.txt
# start the container created in Ex2
docker container ls -a
docker start -i brave_ptolemy
# install nano to edit index.js
apt-get update
apt-get -y install nano
# edit index.js
nano /usr/src/app/index.js
console.log('Hello World')
Ctrl-x y Enter
# install curl to get node
apt-get -y install curl
# install node
curl -sL https://deb.nodesource.com/setup_20.x | bash
apt install -y nodejs
# execute index.js
node usr/src/app/index.js
exit
script -p script-answers/exercise12_3-4.txt