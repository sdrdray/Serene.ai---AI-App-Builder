import { testSkipIfWindows } from "./helpers/test_helper";

testSkipIfWindows("serene tags handles nested < tags", async ({ po }) => {
  await po.setUp({ autoApprove: true });
  await po.importApp("minimal");
  await po.sendPrompt("tc=serene-write-angle");
  await po.snapshotAppFiles({ name: "angle-tags-handled" });
});
