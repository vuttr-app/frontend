#!/bin/sh
cd /ws/app/vue && npm install
(yarn serve &)
(PORT=4300 VUE_APP_API=http://localhost:4000 yarn serve &)

exit 0
