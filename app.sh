#!/bin/sh
cd /ws/app/vue && npm install &&
(PORT=4200 VUE_APP_API=http://172.11.1.3:4000 yarn serve &) &&
(PORT=4300 VUE_APP_API=http://localhost:4000 yarn serve &) &&

cd /ws/app/react && npm install &&
(PORT=4400 REACT_APP_API=http://172.11.1.3:4000 npm start &) &&
(PORT=4500 REACT_APP_API=http://localhost:4000 npm start &)

exit 0
