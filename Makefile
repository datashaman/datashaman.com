watch:
	while inotifywait -r -e modify -e close_write src views tongs.json ../tongs/*; do tongs; done
