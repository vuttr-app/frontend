#!/bin/sh
cd /ws/app/vue && npm install
(yarn serve &)
(PORT=4300 VUE_APP_API=http://localhost:4000 yarn serve &)

cd /ws/app/react && npm install
(PORT=4400 REACT_APP_API=$VUE_APP_API yarn start &)
(PORT=4500 REACT_APP_API=http://localhost:4000 yarn start &)

exit 0
