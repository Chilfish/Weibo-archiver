import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import {
  ArrowRight,
  Calendar,
  Database,
  FileSearch,
  Grid,
} from 'lucide-vue-next'
import { RouterLink } from 'vue-router'

const currentYear = new Date().getFullYear()

const NavLink = (props: { href: string, text: string }) => (
  <a
    href={props.href}
    class="text-sm font-medium hover:text-[#FF8200] transition-colors"
  >
    {props.text}
  </a>
)

const FeatureListItem = (props: { text: string }) => (
  <li class="flex items-start">
    <div
      class="mr-2 mt-1 h-5 w-5 rounded-full bg-green-100 flex items-center justify-center"
    >
      <svg
        class="h-3 w-3 text-green-500"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fill-rule="evenodd"
          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
          clip-rule="evenodd"
        />
      </svg>
    </div>
    <span>{props.text}</span>
  </li>
)

const SectionBadge = (props: { text: string }) => (
  <div
    class="inline-flex items-center rounded-full bg-orange-100 px-3 py-1 text-sm font-medium text-[#FF8200] mb-6"
  >
    <span class="flex h-2 w-2 rounded-full bg-[#FF8200] mr-2"></span>
    {props.text}
  </div>
)

interface FeatureSectionItemProps {
  title: string
  description: string
  imageUrl: string
  imageAlt: string
  IconComponent: any // Lucide icon component
  listItems: string[]
  imageOnLeft: boolean
}

const FeatureSectionItem = (props: FeatureSectionItemProps) => {
  const textBlock = (
    <div>
      <div class="inline-flex rounded-lg bg-orange-100 p-3 text-[#FF8200] mb-4">
        <props.IconComponent class="h-6 w-6" />
      </div>
      <h3 class="text-2xl font-bold mb-4">{props.title}</h3>
      <p class="text-gray-600 mb-6">{props.description}</p>
      <ul class="space-y-2">
        {props.listItems.map((item, index) => (
          <FeatureListItem
            key={index}
            text={item}
          />
        ))}
      </ul>
    </div>
  )

  const imageBlock = (
    <img
      src={props.imageUrl}
      alt={props.imageAlt}
      width={600}
      height={400}
      class="rounded-xl shadow-lg object-cover"
    />
  )

  if (props.imageOnLeft) {
    return (
      <div class="mt-20 grid items-center gap-8 md:grid-cols-2">
        <div class="order-2 md:order-1">{imageBlock}</div>
        <div class="order-1 md:order-2">{textBlock}</div>
      </div>
    )
  }
  else { // Image on right, text on left
    return (
      <div class="mt-20 grid items-center gap-8 md:grid-cols-2">
        <div>{textBlock}</div>
        <div>{imageBlock}</div>
      </div>
    )
  }
}

interface HowItWorksStepProps {
  stepNumber: string
  title: string
  description: string
  imageUrl: string
  imageAlt: string
}

const HowItWorksStep = (props: HowItWorksStepProps) => (
  <div
    class="relative bg-white rounded-xl p-6 shadow-lg border border-gray-100 transition-all hover:shadow-xl"
  >
    <div
      class="absolute -top-5 -left-5 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-[#FF8200] to-[#FF5500] text-white shadow-lg"
    >
      <span class="text-xl font-bold">{props.stepNumber}</span>
    </div>
    <div class="pt-6">
      <h3 class="mb-4 text-xl font-semibold">{props.title}</h3>
      <p class="text-gray-600">{props.description}</p>
      <img
        src={props.imageUrl}
        alt={props.imageAlt}
        width={400}
        height={200}
        class="mt-4 rounded-lg object-cover h-40 w-full"
      />
    </div>
  </div>
)

interface FaqItemProps {
  value: string
  triggerText: string
  contentText: string
}

const FaqItem = (props: FaqItemProps) => (
  <AccordionItem value={props.value} class="border-b border-gray-200">
    <AccordionTrigger
      class="text-left font-medium py-4 hover:text-[#FF8200] transition-colors"
    >
      {props.triggerText}
    </AccordionTrigger>
    <AccordionContent class="pb-4 text-gray-600">
      {props.contentText}
    </AccordionContent>
  </AccordionItem>
)

// Data for components
const featuresData: FeatureSectionItemProps[] = [
  {
    title: '智能搜索',
    description: '通过关键词、日期或标签快速查找历史微博，无论您发布了多少内容，都能在几秒内定位到您需要的信息。支持高级搜索语法，让查找更加精准。',
    imageUrl: 'https://images.unsplash.com/photo-1555952494-efd681c7e3f9?q=80&w=2574&auto=format&fit=crop',
    imageAlt: '智能搜索功能',
    IconComponent: FileSearch,
    listItems: ['全文搜索，支持多关键词组合', '按日期范围筛选结果', '搜索结果实时预览'],
    imageOnLeft: true,
  },
  {
    title: '相册浏览',
    description: '以精美图库形式展示所有图片内容，支持多种浏览模式，让您轻松回顾精彩瞬间。支持按时间线、相册分类浏览，并提供强大的图片管理功能。',
    imageUrl: 'https://images.unsplash.com/photo-1493946740644-2d8a1f1a6aff?q=80&w=2668&auto=format&fit=crop',
    imageAlt: '相册浏览功能',
    IconComponent: Grid,
    listItems: ['瀑布流和网格视图切换', '高清图片查看器，支持缩放和分享', '自动分类和标签管理'],
    imageOnLeft: false,
  },
  {
    title: '那年今日',
    description: '展示历史上同一天发布的微博，重温往日记忆。系统会自动整理您过去在同一天发布的所有内容，帮助您回顾生活中的重要时刻和变化。',
    imageUrl: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=2668&auto=format&fit=crop',
    imageAlt: '那年今日功能',
    IconComponent: Calendar,
    listItems: ['时间线视图，按年份对比', '每日提醒，不错过回忆', '一键分享到当前微博'],
    imageOnLeft: true,
  },
]

const howItWorksStepsData: HowItWorksStepProps[] = [
  {
    stepNumber: '1',
    title: '安装油猴脚本',
    description: '下载并安装 Tampermonkey 浏览器扩展，然后添加 Weibo-archiver 脚本。这个过程只需几分钟，我们提供详细的安装指南。',
    imageUrl: 'https://images.unsplash.com/photo-1607798748738-b15c40d33d57?q=80&w=2670&auto=format&fit=crop',
    imageAlt: '安装油猴脚本',
  },
  {
    stepNumber: '2',
    title: '导入微博数据',
    description: '登录微博账号，脚本将自动收集并保存您的微博内容到本地。您可以选择备份的内容类型和时间范围，完全自定义备份过程。',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop',
    imageAlt: '导入微博数据',
  },
  {
    stepNumber: '3',
    title: '浏览备份内容',
    description: '打开 Weibo-archiver 网页应用，开始浏览和管理您的微博备份。所有数据都存储在本地，确保您的隐私安全，随时可以访问。',
    imageUrl: 'https://images.unsplash.com/photo-1512075135822-67cdd9dd7314?q=80&w=2574&auto=format&fit=crop',
    imageAlt: '浏览备份内容',
  },
]

const faqItemsData: FaqItemProps[] = [
  {
    value: 'item-1',
    triggerText: 'Weibo-archiver 是否会保存我的微博账号密码？',
    contentText: '不会。Weibo-archiver 只是在您已登录的浏览器中运行，不会收集或存储您的账号密码。所有数据都保存在您的本地设备上，不会上传到任何服务器。',
  },
  {
    value: 'item-2',
    triggerText: '我可以备份多个微博账号的内容吗？',
    contentText: '可以。Weibo-archiver 支持导入和切换多个用户数据。您可以为每个账号创建单独的备份，并在应用中轻松切换查看不同账号的内容。',
  },
  {
    value: 'item-3',
    triggerText: '备份过程需要多长时间？',
    contentText: '备份时间取决于您的微博数量和网络速度。一般来说，几百条微博可能需要几分钟，上千条可能需要半小时左右。备份过程支持断点续传，您可以随时暂停和继续。',
  },
  {
    value: 'item-4',
    triggerText: 'Weibo-archiver 是否支持备份视频内容？',
    contentText: '是的，Weibo-archiver 支持备份视频链接。由于视频文件通常较大，默认情况下我们只保存视频链接，但您可以选择下载视频文件到本地存储。',
  },
  {
    value: 'item-5',
    triggerText: '我的数据存储在哪里？是否安全？',
    contentText: '所有数据都存储在您的本地设备上，不会上传到任何服务器。您可以选择将数据导出为JSON或HTML格式，并手动备份到其他存储设备。数据安全完全由您控制。',
  },
  {
    value: 'item-6',
    triggerText: 'Weibo-archiver 是否需要付费使用？',
    contentText: 'Weibo-archiver 是一个完全免费的开源项目。我们不收取任何费用，也不会在应用中投放广告。如果您喜欢这个项目，可以考虑给项目加星或贡献代码。',
  },
]

export const Landing = () => (
  <main class="flex min-h-screen flex-col items-center">
    {/* Navigation */}
    <header
      class="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md"
    >
      <div class="px-12 flex h-16 items-center justify-between">
        <div class="flex items-center gap-2">
          <div
            class="rounded-full bg-gradient-to-r from-[#FF8200] to-[#FF5500] p-1.5"
          >
            <Database class="h-5 w-5 text-white" />
          </div>
          <span
            class="text-xl font-semibold bg-gradient-to-r from-[#FF8200] to-[#FF5500] bg-clip-text text-transparent"
          >
            Weibo-archiver
          </span>
        </div>
        <nav class="hidden md:flex items-center gap-6">
          <NavLink href="#features" text="功能特性" />
          <NavLink href="#how-it-works" text="工作原理" />
          <NavLink href="#faq" text="常见问题" />
        </nav>
        <div class="flex items-center gap-4">
          <Button variant="outline" class="hidden md:flex">
            查看文档
          </Button>
          <Button
            as-child
            class="bg-gradient-to-r from-[#FF8200] to-[#FF5500] hover:from-[#FF7000] hover:to-[#FF4500]"
          >
            <RouterLink to="/post">
              开始使用
            </RouterLink>
          </Button>
        </div>
      </div>
    </header>

    <main class="w-full flex flex-col items-center">
      {/* Hero Section */}
      <section
        class="w-full relative overflow-hidden bg-gradient-to-b from-[#FFF8F0] to-white py-20 md:py-28"
      >
        <div class="w-full relative z-10 px-6">
          <div class="mx-auto max-w-3xl text-center">
            <SectionBadge text="永久保存您的微博记忆" />
            <h1
              class="text-4xl font-bold tracking-tight md:text-6xl bg-gradient-to-r from-[#FF8200] to-[#FF5500] bg-clip-text text-transparent"
            >
              不让珍贵回忆消失
            </h1>
            <p class="mt-6 text-lg text-gray-600 md:text-xl">
              Weibo-archiver
              是一个专为新浪微博用户设计的备份工具，帮助您在账号可能被限制或删除前保存个人微博内容，包括文字、图片和视频链接。
            </p>
            <div
              class="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <Button
                as-child
                class="w-full bg-gradient-to-r from-[#FF8200] to-[#FF5500] hover:from-[#FF7000] hover:to-[#FF4500] sm:w-auto"
              >
                <RouterLink
                  to="/post"
                >

                  开始导入数据
                  <ArrowRight class="ml-2 h-4 w-4" />
                </RouterLink>
              </Button>
            </div>
          </div>
        </div>

        {/* Main App Screenshot */}
        <div class="mt-16 mx-auto max-w-5xl px-4">
          <div
            class="rounded-xl overflow-hidden shadow-2xl border border-gray-200"
          >
            <img
              src="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=2574&auto=format&fit=crop"
              alt="Weibo-archiver 应用界面"
              width={1200}
              height={675}
              class="w-full object-cover"
            />
          </div>
        </div>

        <div
          class="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white to-transparent"
        />
      </section>

      {/* Features Section */}
      <section id="features" class="py-20 px-6 w-full flex flex-col items-center">
        <div class="max-w-2xl text-center">
          <SectionBadge text="功能特性" />
          <h2
            class="text-3xl font-bold tracking-tight md:text-4xl"
          >
            全方位的微博备份体验
          </h2>
          <p class="mt-4 text-gray-600">
            Weibo-archiver 提供完整的微博内容备份和浏览功能，让您的记忆永不丢失
          </p>
        </div>

        {featuresData.map((feature, index) => (
          <FeatureSectionItem
            key={index}
            title={feature.title}
            description={feature.description}
            imageUrl={feature.imageUrl}
            imageAlt={feature.imageAlt}
            IconComponent={feature.IconComponent}
            listItems={feature.listItems}
            imageOnLeft={feature.imageOnLeft}
          />
        ))}
      </section>

      {/* How It Works Section */}
      <section
        id="how-it-works"
        class="w-full px-12 py-20 bg-gradient-to-b from-[#FFF8F0] to-white"
      >
        <div class="mx-auto max-w-2xl text-center">
          <SectionBadge text="工作原理" />
          <h2
            class="text-3xl font-bold tracking-tight md:text-4xl"
          >
            简单三步，开始备份
          </h2>
          <p class="mt-4 text-gray-600">
            Weibo-archiver
            提供简单直观的使用流程，让您轻松备份微博内容
          </p>
        </div>

        <div class="mt-16 grid gap-8 md:grid-cols-3">
          {howItWorksStepsData.map((step, index) => (
            <HowItWorksStep
              key={index}
              stepNumber={step.stepNumber}
              title={step.title}
              description={step.description}
              imageUrl={step.imageUrl}
              imageAlt={step.imageAlt}
            />
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" class="w-full py-20 px-6">
        <div class="mx-auto max-w-2xl text-center">
          <SectionBadge text="常见问题" />
          <h2
            class="text-3xl font-bold tracking-tight md:text-4xl"
          >
            您可能想知道的问题
          </h2>
          <p class="mt-4 text-gray-600">
            关于 Weibo-archiver 的常见问题解答
          </p>
        </div>

        <div class="mt-12 mx-auto max-w-3xl">
          <Accordion type="single" collapsible class="w-full">
            {faqItemsData.map((faq, index) => (
              <FaqItem
                key={index}
                value={faq.value}
                triggerText={faq.triggerText}
                contentText={faq.contentText}
              />
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section class="w-full px-6 py-20 bg-gradient-to-b from-[#FFF8F0] to-white">
        <div
          class=" mx-auto max-w-3xl rounded-2xl bg-gradient-to-r from-[#FF8200] to-[#FF5500] p-8 text-center text-white md:p-12"
        >
          <h2
            class="text-3xl font-bold tracking-tight md:text-4xl"
          >
            立即开始备份您的微博记忆
          </h2>
          <p class="mt-4 text-white/90">
            不要让珍贵的回忆消失，现在就使用
            Weibo-archiver 保存您的微博内容
          </p>
          <Button
            as-child
            class="mt-8 bg-white text-[#FF8200] hover:bg-gray-100"
          >
            <RouterLink to="/post">
              开始使用
              <ArrowRight class="ml-2 h-4 w-4" />
            </RouterLink>
          </Button>
        </div>
      </section>
    </main>

    {/* Footer */}
    <footer class="w-full border-t bg-white py-12 sm:px-16">
      <div
        class="flex flex-col items-center justify-between gap-6 md:flex-row"
      >
        <div class="flex items-center gap-2">
          <div
            class="rounded-full bg-gradient-to-r from-[#FF8200] to-[#FF5500] p-1.5"
          >
            <Database class="h-5 w-5 text-white" />
          </div>
          <span
            class="text-xl font-semibold bg-gradient-to-r from-[#FF8200] to-[#FF5500] bg-clip-text text-transparent"
          >
            Weibo-archiver
          </span>
        </div>
        <nav
          class="flex flex-wrap items-center justify-center gap-x-8 gap-y-4"
        >
          <a
            href="#features"
            class="text-sm text-gray-600 hover:text-[#FF8200]"
          >
            功能特性
          </a>
          <a
            href="#how-it-works"
            class="text-sm text-gray-600 hover:text-[#FF8200]"
          >
            工作原理
          </a>
          <a
            href="#faq"
            class="text-sm text-gray-600 hover:text-[#FF8200]"
          >
            常见问题
          </a>
          <a
            href="#"
            class="text-sm text-gray-600 hover:text-[#FF8200]"
          >
            隐私政策
          </a>
        </nav>
        <div class="text-sm text-gray-600">
          ©
          {currentYear}
          {' '}
          Weibo-archiver. 保留所有权利。
        </div>
      </div>
    </footer>
  </main>

)

export default Landing
