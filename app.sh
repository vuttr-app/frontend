#!/bin/sh +x

(cd /ws/react && npm i && PORT=4300 REACT_APP_API=http://localhost:4000 yarn start &)
(cd /ws/vue && npm i && PORT=4400 REACT_APP_API=http://localhost:4000 yarn serve &)
(cd /ws/react && PORT=4200 REACT_APP_API=http://172.21.1.7:4000 yarn start)

exit 0
