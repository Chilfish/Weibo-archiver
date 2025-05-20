import type { FunctionalComponent } from 'vue'
import {
  ArrowRight,
  Calendar,
  Download,
  FileSearch,
  GithubIcon,
  Grid,
  Heart,
  Lock,
  Settings,
  Users,
} from 'lucide-vue-next'
import { RouterLink } from 'vue-router'
import ImportData from '@/components/common/ImportData.vue'
import LazyImage from '@/components/common/LazyImage.vue'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const Link = (props: {
  href: string
  text: any
}) => (
  <a
    href={props.href}
    target={props.href.startsWith('http') ? '_blank' : '_self'}
    class="text-sm text-gray-600 hover:text-[#FF8200]"
  >
    {props.text}
  </a>
)

const FAQItem = (props: {
  question: string
  answer: string
  id: number
}) => (
  <AccordionItem
    value={`item-${props.id}`}
    class="border-b border-gray-200"
  >
    <AccordionTrigger class="text-left font-medium py-4 hover:text-[#FF8200] transition-colors">
      {props.question}
    </AccordionTrigger>
    <AccordionContent class="pb-4 text-gray-600">
      {props.answer}
    </AccordionContent>
  </AccordionItem>
)

const ToolFeatureLi = (props: {
  title: string
  description: string
}) => (
  <li class="flex items-start">
    <div class="mr-3 mt-1 h-5 w-5 rounded-full bg-green-100 flex items-center justify-center">
      <svg class="h-3 w-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
        <path
          full-fule="evenodd"
          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
          clip-rule="evenodd"
        />
      </svg>
    </div>
    <div>
      <span class="font-medium">{props.title}</span>
      <p class="text-sm text-gray-600 mt-1">
        {props.description}
      </p>
    </div>
  </li>
)

const Feature = (props: {
  title: string
  description: string
  icon: FunctionalComponent
}) => (
  <div class="group relative overflow-hidden rounded-xl border bg-white p-6 shadow-sm transition-all hover:shadow-md">
    <div class="absolute top-0 right-0 h-20 w-20 bg-gradient-to-bl from-orange-100 to-transparent opacity-60 transition-all group-hover:opacity-100"></div>
    <div class="relative">
      <div class="mb-4 inline-flex rounded-lg bg-orange-100 p-3 text-[#FF8200]">
        <props.icon />
      </div>
      <h3 class="mb-2 text-xl font-semibold">{props.title}</h3>
      <p class="text-gray-600">{props.description}</p>
    </div>
  </div>
)

const features = [
  {
    title: '微博搜索',
    description: '支持关键词查找历史微博，快速定位您需要的内容',
    icon: FileSearch,
  },
  {
    title: '浏览相册',
    description: '以图库形式展示所有图片内容，轻松回顾精彩瞬间',
    icon: Grid,
  },
  {
    title: '收藏管理',
    description: '查看和管理您的收藏微博',
    icon: Heart,
  },
  {
    title: '那年今日',
    description: '展示历史上同一天发布的微博，重温往日记忆',
    icon: Calendar,
  },
  {
    title: '关注列表',
    description: '管理和浏览关注的账号',
    icon: Users,
  },
  {
    title: '隐私保护',
    description: '所有数据存储在本地，确保您的隐私安全',
    icon: Lock,
  },
] as {
  title: string
  description: string
  icon: FunctionalComponent
}[]

const toolFeatures = {
  monkey: [
    {
      title: '全面的导出选项',
      description: '支持导出原创微博、转发微博、图片、评论、收藏和关注列表',
    },
    {
      title: '自定义导出范围',
      description: '可设置时间范围、评论获取数量等参数，灵活控制导出内容',
    },
    {
      title: '断点续传',
      description: '支持从上次停止的地方继续抓取，避免重复工作',
    },
  ],
  web: [
    {
      title: '多种浏览模式',
      description: '时间线、相册、收藏、那年今日等多种视图，满足不同浏览需求',
    },
    {
      title: '搜搜功能',
      description: '全文搜索，快速找到您需要的内容，支持多种筛选条件',
    },
    {
      title: '本地数据存储',
      description: '所有数据存储在本地，保障隐私安全，无需担心数据泄露',
    },
  ],
} as {
  [key: string]: {
    title: string
    description: string
  }[]
}

const faqItems = [
  {
    question: 'Weibo-archiver 是否会保存我的微博账号密码？',
    answer: '不会。Weibo-archiver 只是在您已登录的浏览器中运行，不会收集或存储您的账号密码。所有数据都保存在您的本地设备上，不会上传到任何服务器。',
  },
  {
    question: '我的数据存储在哪里？是否安全？',
    answer: '所有数据都存储在您的本地浏览器设备上，不会上传到任何服务器。您可以选择将数据导出为JSON格式，并手动备份到其他存储设备。数据安全完全由您控制。',
  },
  {
    question: '我可以备份多个微博账号的内容吗？',
    answer: '可以。Weibo-archiver 免费支持导入和切换多个用户数据。您可以为每个账号创建单独的备份，并在应用中轻松切换查看不同账号的内容。',
  },
] as {
  question: string
  answer: string
}[]

const imgHost = 'https://p.chilfish.top'

export default function LandingPage() {
  return (
    <div class="flex min-h-screen flex-col bg-[#F5F7FA]">
      {/* Navigation */}
      <header class="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md px-6">
        <div class=" flex h-16 items-center justify-between">
          <div class="flex items-center gap-2">
            <img
              src="/icon.webp"
              alt="Weibo-archiver logo"
              width={36}
              height={36}
              class="rounded-xl"
            />
            <span class="text-xl font-semibold bg-gradient-to-r from-[#FF8200] to-[#FF5500] bg-clip-text text-transparent">
              Weibo-archiver
            </span>
          </div>
          <nav class="hidden md:flex items-center gap-6">
            <a href="#features" class="text-sm font-medium hover:text-[#FF8200] transition-colors">
              功能特性
            </a>
            <a href="#tools" class="text-sm font-medium hover:text-[#FF8200] transition-colors">
              两大工具
            </a>
            <a href="#faq" class="text-sm font-medium hover:text-[#FF8200] transition-colors">
              常见问题
            </a>
          </nav>
          <div class="flex items-center gap-4">
            {/* <Button variant="outline" class="hidden md:flex"> */}
            {/*  查看文档 */}
            {/* </Button> */}
            <Button
              class="bg-gradient-to-r from-[#FF8200] to-[#FF5500] hover:from-[#FF7000] hover:to-[#FF4500]"
              asChild
            >
              <RouterLink to="/post">
                开始使用
              </RouterLink>
            </Button>
          </div>
        </div>
      </header>

      <main class="flex-1">
        {/* Hero Section */}
        <section class="relative overflow-hidden py-20 md:py-28 px-6 sm:px-12">
          <div class="absolute inset-0 bg-gradient-to-b from-[#FFF8F0] to-[#F5F7FA] -z-10"></div>
          <div class=" relative z-10">
            <div class="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div class="inline-flex items-center rounded-full bg-orange-100 px-3 py-1 text-sm font-medium text-[#FF8200] mb-6">
                  <span class="flex h-2 w-2 rounded-full bg-[#FF8200] mr-2"></span>
                  永久保存您的微博记忆
                </div>
                <h1 class="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                  <span class="bg-gradient-to-r from-[#FF8200] to-[#FF5500] bg-clip-text text-transparent">
                    不让珍贵回忆消失
                  </span>
                </h1>
                <p class="mt-6 text-lg text-gray-600">
                  Weibo-archiver
                  是一个专为新浪微博用户设计的备份工具，帮助您在账号可能被限制或删除前保存个人微博内容，包括文字和图片。
                </p>
                <div class="mt-10 flex items-start gap-4">
                  <Button
                    size="lg"
                    class="relative bg-gradient-to-r from-[#FF8200] to-[#FF5500] hover:from-[#FF7000] hover:to-[#FF4500]"
                  >
                    <ImportData />
                    开始导入数据
                    <ArrowRight class="ml-2 h-4 w-4" />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    asChild
                  >
                    <RouterLink
                      to="/post"
                    >
                      查看已有数据
                    </RouterLink>
                  </Button>
                </div>
              </div>
              <div class="relative">
                <div class="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-pink-500 to-[#FF8200] opacity-20 blur-xl"></div>
                <div class="relative rounded-2xl overflow-hidden border border-gray-200 shadow-xl bg-white">
                  <img
                    src={`${imgHost}/weibo/kv_wrap_weibo.png`}
                    alt="Weibo-archiver 应用界面"
                    width={800}
                    height={600}
                    class="w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" class="py-20">
          <div class=" px-12">

            <div class="mx-auto max-w-2xl text-center">
              <div class="inline-flex items-center rounded-full bg-orange-100 px-3 py-1 text-sm font-medium text-[#FF8200] mb-6">
                <span class="flex h-2 w-2 rounded-full bg-[#FF8200] mr-2"></span>
                功能特性
              </div>
              <h2 class="text-3xl font-bold tracking-tight md:text-4xl">全方位的微博备份体验</h2>
              <p class="mt-4 text-gray-600">Weibo-archiver 提供完整的微博内容备份和浏览功能，让您的记忆永不丢失</p>
            </div>

            <div class="mt-16 grid gap-4 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
              {features.map(({ title, description, icon }, index) => (
                <Feature
                  title={title}
                  description={description}
                  icon={icon}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Tools Section */}
        <section
          id="tools"
          class="py-20 bg-gradient-to-b from-white to-[#F5F7FA]"
        >
          <div class=" px-12">
            <div class="mx-auto max-w-2xl text-center">
              <div class="inline-flex items-center rounded-full bg-orange-100 px-3 py-1 text-sm font-medium text-[#FF8200] mb-6">
                <span class="flex h-2 w-2 rounded-full bg-[#FF8200] mr-2"></span>
                两大工具
              </div>
              <h2 class="text-3xl font-bold tracking-tight md:text-4xl">一体化解决方案</h2>
              <p class="mt-4 text-gray-600">
                Weibo-archiver 提供数据导出工具和浏览应用两大组件，满足您的完整备份需求
              </p>
            </div>

            <div class="mt-12">
              <Tabs
                defaultValue="exporter"
                class="w-full"
              >
                <TabsList class="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
                  <TabsTrigger value="exporter" class="text-base">
                    数据导出工具
                  </TabsTrigger>
                  <TabsTrigger value="browser" class="text-base">
                    网页浏览应用
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="exporter">
                  <div class="grid md:grid-cols-2 gap-12 items-center">
                    <div class="order-2 md:order-1 items-center flex justify-center">
                      <LazyImage
                        src={`${imgHost}/weibo/monkey.png`}
                        alt="Weibo-archiver 数据导出工具"
                        class="sm:w-[60%] rounded-xl"
                        rawSrc={true}
                      />
                    </div>
                    <div class="order-1 md:order-2">
                      <h3 class="text-2xl font-bold mb-4">油猴脚本 - 数据导出工具</h3>
                      <p class="text-gray-600 mb-6">
                        通过简单易用的浏览器扩展，一键导出您的微博数据。支持多种导出选项，满足不同备份需求。
                      </p>
                      <ul class="space-y-4">
                        {toolFeatures.monkey.map(item => (
                          <ToolFeatureLi description={item.description} title={item.title} />
                        ))}
                      </ul>
                      <div class="mt-8">
                        <Button
                          as="a"
                          href="https://p.chilfish.top/weibo/weibo-archiver.user.js"
                          target="_blank"
                          size="lg"
                          class="bg-white text-[#FF8200] hover:bg-gray-100"
                        >
                          <Download class="mr-2 h-4 w-4" />
                          安装油猴脚本
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="browser">
                  <div class="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                      <h3 class="text-2xl font-bold mb-4">Web 应用 - 数据浏览工具</h3>
                      <p class="text-gray-600 mb-6">
                        通过优雅的网页界面，轻松浏览和管理您备份的微博内容。支持多种查看方式，让您的回忆触手可及。
                      </p>
                      <ul class="space-y-4">
                        {toolFeatures.web.map(item => (
                          <ToolFeatureLi description={item.description} title={item.title} />
                        ))}
                      </ul>
                      <div class="mt-8">
                        <Button
                          asChild
                          class="bg-gradient-to-r from-[#FF8200] to-[#FF5500] hover:from-[#FF7000] hover:to-[#FF4500]"
                        >
                          <RouterLink to="/post">

                            <Settings class="mr-2 h-4 w-4" />
                            打开 Web 应用
                          </RouterLink>

                        </Button>
                      </div>
                    </div>
                    <div>
                      <div class="relative">
                        <div class="absolute -inset-1 rounded-2xl bg-gradient-to-r from-pink-500 to-[#FF8200] opacity-20 blur-xl"></div>
                        <div class="relative rounded-2xl overflow-hidden border border-gray-200 shadow-xl bg-white">
                          <img
                            src={`${imgHost}/weibo/kv_wrap_weibo.png`}
                            alt="Weibo-archiver Web 应用界面"
                            width={800}
                            height={600}
                            class="w-full object-cover"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" class="py-20 bg-gradient-to-b from-[#F5F7FA] to-white">
          <div class="px-6">
            <div class="mx-auto max-w-2xl text-center">
              <div class="inline-flex items-center rounded-full bg-orange-100 px-3 py-1 text-sm font-medium text-[#FF8200] mb-6">
                <span class="flex h-2 w-2 rounded-full bg-[#FF8200] mr-2"></span>
                常见问题
              </div>
              <h2 class="text-3xl font-bold tracking-tight md:text-4xl">您可能想知道的问题</h2>
              <p class="mt-4 text-gray-600">关于 Weibo-archiver 的常见问题解答</p>
            </div>

            <div class="mt-12 mx-auto max-w-3xl">
              <Accordion type="single" collapsible class="w-full">
                {faqItems.map((item, idx) => (
                  <FAQItem id={idx} answer={item.answer} question={item.question} />
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section class="py-20">
          <div class="px-6">
            <div class="mx-auto max-w-3xl rounded-2xl bg-gradient-to-r from-[#FF8200] to-[#FF5500] p-8 text-center text-white md:p-12">
              <h2 class="text-3xl font-bold tracking-tight md:text-4xl">立即开始备份您的微博记忆</h2>
              <p class="mt-4 text-white/90">不要让珍贵的回忆消失，现在就使用 Weibo-archiver 保存您的微博内容</p>
              <div class="mt-8 flex flex-col sm:flex-row justify-center gap-4">
                <Button
                  as="a"
                  href="https://p.chilfish.top/weibo/weibo-archiver.user.js"
                  target="_blank"
                  size="lg"
                  class="bg-white text-[#FF8200] hover:bg-gray-100"
                >
                  <Download class="mr-2 h-4 w-4" />
                  安装油猴脚本
                </Button>
                <Button
                  asChild
                  size="lg"
                  class="bg-white/20 hover:bg-white/30 text-white border-white"
                >
                  <RouterLink to="/post">

                    <Settings class="mr-2 h-4 w-4" />
                    打开 Web 应用
                  </RouterLink>

                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer class="border-t bg-white py-12 px-6">
        <div class="">
          <div class="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div class="flex items-center gap-2">
              <img
                src="/icon.webp"
                alt="Weibo-archiver logo"
                width={36}
                height={36}
                class="rounded-xl"
              />
              <span class="text-xl font-semibold bg-gradient-to-r from-[#FF8200] to-[#FF5500] bg-clip-text text-transparent">
                Weibo-archiver
              </span>
            </div>
            <nav class="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
              <Link href="#features" text="功能特性" />
              <Link href="#faq" text="常见问题" />
              <Link
                href="https://github.com/Chilfish/Weibo-archiver"
                text={<GithubIcon class="size-4" />}
              />
            </nav>
            <div class="text-sm text-gray-600">
              ©
              {new Date().getFullYear()}
              {' '}
              Weibo-archiver. 保留所有权利。
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
