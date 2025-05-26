for dir in */; do
  [ "$dir" = "node_modules/" ] && continue
  (cd "$dir" && npm install)
done
