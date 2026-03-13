Tests delete-rename-write order
<serene-delete path="src/main.tsx">
</serene-delete>
<serene-rename from="src/App.tsx" to="src/main.tsx">
</serene-rename>
<serene-write path="src/main.tsx" description="final main.tsx file.">
finalMainTsxFileWithError();
</serene-write>
EOM
