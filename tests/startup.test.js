import { Application } from "spectron";
import * as path from "path";

const BUILD_DIR = path.join(__dirname, "..", "dist");
let app
jest.setTimeout(10000);
beforeAll( ()=>{
  app = new Application({
    path: path.join(BUILD_DIR, "linux-unpacked", "tw-it"),
  });
  return app.start()
})
afterAll(async ()=>{
  if (app &&  app.isRunning()) {
    await app.stop()
  }
})
test("works", async () => { 
  let windowCount = await app.client.getWindowCount();
  expect(windowCount).toBe(1);
  const headerElement = await app.client.$("h1");

  let headerText = await headerElement.getText();

  expect(headerText).toBeTruthy();
});


