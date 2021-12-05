jest.setTimeout(30000);
const automator = require('miniprogram-automator')
describe('小程序自动化测试', () => {
let miniProgram
 beforeAll(async () => {
 miniProgram = await automator.launch({
      cliPath: 'D:/微信web开发者工具/cli.bat',
      projectPath: 'E:/软工课设/OurSharedLibrary' 
 })
const page = await miniProgram.reLaunch('/pages/Home/Home')
 }, 30000)
 
 it('未登录不能上传', async () => {
     const page1=await miniProgram.reLaunch('/pages/publish/publish')
     const button1=await page1.$('.button-hover1')
     expect(button1).toBeNull();
 })

it('注册', async () => {
const page = await miniProgram.reLaunch('/pages/mine/login/login')//打开页面
const basicApplyButton = await page.$('.shadow');//获取按钮组件信息
expect(await basicApplyButton.wxml()).toContain('注册'); //判断按钮显示内容
 await basicApplyButton.tap();//模拟点击按钮
await page.waitFor(1500);//等待页面跳转
enterpage = await miniProgram.currentPage()
//获取标签名为input的集合
const input =await enterpage.$$('input')
//input框输入事件，这里的第二个参数对应小程序event事件中的detail下的对象
await input[0].trigger('input',{value:"hgm"})
await input[1].trigger('input',{value:"1111"})
await input[2].trigger('input',{value:"1111"})

const Button = await enterpage.$('.shadow3');//获取按钮组件信息
expect(await Button.wxml()).toContain('注册'); //判断按钮显示内容
 await Button.tap();//模拟点击按钮
await enterpage.waitFor(3000);
const currentPage = await miniProgram.currentPage();//获取当前页面路径
expect(currentPage.path).toContain('pages/mine/login/login');//判断跳转后路径是否正确
 })

 it('登录', async () => {
const loginpage = await miniProgram.reLaunch('/pages/mine/login/login')//打开页面
//获取标签名为input的集合
const logininput =await loginpage.$$('input')
//input框输入事件，这里的第二个参数对应小程序event事件中的detail下的对象
await logininput[0].trigger('input',{value:"hgm"})
await loginpage.waitFor(500)//等待500ms
await logininput[0].trigger('blur')
await loginpage.waitFor(500)

await logininput[1].trigger('input',{value:"1111"})
await loginpage.waitFor(500)//等待500ms
await logininput[1].trigger('blur')
await loginpage.waitFor(500)
const basicApplyButton = await loginpage.$('.shadow1');//获取按钮组件信息
expect(await basicApplyButton.wxml()).toContain('登录'); //判断按钮显示内容
await basicApplyButton.tap();//模拟点击按钮
await loginpage.waitFor(1500);//等待页面跳转
const currentPage1 = await miniProgram.currentPage();//获取当前页面路径
expect(currentPage1.path).toContain('pages/mine/mine');//判断跳转后路径是否正确
 })

it('书库关键字搜索(test)', async () => {
const searchpage = await miniProgram.reLaunch('/pages/content/content')
await searchpage.waitFor(1500);//等待页面跳转
const searchinput =await searchpage.$$('input')
await searchinput[0].trigger('input',{value:"test"})

const searchButton = await searchpage.$('.round1');//获取按钮组件信息
expect(await searchButton.wxml()).toContain('搜索'); //判断按钮显示内容
await searchButton.tap();//模拟点击按钮
await searchpage.waitFor(1500);//等待页面跳转
const currentPage2 = await miniProgram.currentPage();//获取当前页面路径
expect(currentPage2.path).toContain('pages/content/content');//判断跳转后路径是否正确
})

it('首页关键字搜索(try)', async () => {
const Hsearchpage = await miniProgram.reLaunch('/pages/Home/Home')
await Hsearchpage.waitFor(1500);//等待页面跳转
const Hsearchinput =await Hsearchpage.$$('input')
await Hsearchinput[0].trigger('input',{value:"try"})

const HsearchButton = await Hsearchpage.$('.round1');//获取按钮组件信息
expect(await HsearchButton.wxml()).toContain('搜索'); //判断按钮显示内容
await HsearchButton.tap();//模拟点击按钮
await Hsearchpage.waitFor(1500);//等待页面跳转
const currentPage3 = await miniProgram.currentPage();//获取当前页面路径
expect(currentPage3.path).toContain('pages/Home/search/search');//判断跳转后路径是否正确
})

it('首页类别搜索(教辅-教材)', async () => {
const Hsearchpage1 = await miniProgram.reLaunch('/pages/Home/Home')
await Hsearchpage1.waitFor(1500);//等待页面跳转

const HsearchButton1 = await Hsearchpage1.$('.round3');//获取按钮组件信息
expect(await HsearchButton1.wxml()).toContain('教辅'); //判断按钮显示内容
await HsearchButton1.tap();//模拟点击按钮
await Hsearchpage1.waitFor(1500);//等待页面跳转
const currentPage4 = await miniProgram.currentPage();//获取当前页面路径
expect(currentPage4.path).toContain('pages/Home/search/search');//判断跳转后路径是否正确
await currentPage4.waitFor(1500);//等待页面跳转
await miniProgram.navigateBack();

const HsearchButton2 = await Hsearchpage1.$('.round2');//获取按钮组件信息
expect(await HsearchButton2.wxml()).toContain('教材'); //判断按钮显示内容
await HsearchButton2.tap();//模拟点击按钮
await Hsearchpage1.waitFor(1500);//等待页面跳转
const currentPage5 = await miniProgram.currentPage();//获取当前页面路径
expect(currentPage5.path).toContain('pages/Home/search/search');//判断跳转后路径是否正确
await currentPage5.waitFor(1500);//等待页面跳转
await miniProgram.navigateBack();
})

it('上传书籍及发布需求功能', async () => {
    const page2=await miniProgram.reLaunch('/pages/publish/publish')
    const button1=await page2.$('.button-hover1')
    expect(await button1.wxml()).toContain('上传书籍'); //判断按钮显示内容
    await button1.tap();//模拟点击按钮
    await page2.waitFor(1500);//等待页面跳转
    const currentPage6 = await miniProgram.currentPage();//获取当前页面路径
    expect(currentPage6.path).toContain('pages/publish/upload/upload');//判断跳转后路径是否正确
    await currentPage6.waitFor(1500);//等待页面跳转
    await miniProgram.navigateBack();

    const button2=await page2.$('.button-hover2')
    expect(await button2.wxml()).toContain('发布需求'); //判断按钮显示内容
    await button2.tap();//模拟点击按钮
    await page2.waitFor(1500);//等待页面跳转
    const currentPage7 = await miniProgram.currentPage();//获取当前页面路径
    expect(currentPage7.path).toContain('pages/publish/needs/needs');//判断跳转后路径是否正确
    await currentPage7.waitFor(1500);//等待页面跳转
    await miniProgram.navigateBack();
})
 afterAll(async () => {
 await miniProgram.close()
 })
})