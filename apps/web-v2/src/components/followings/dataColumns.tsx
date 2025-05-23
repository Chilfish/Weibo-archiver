import type { ColumnDef } from '@tanstack/vue-table'
import type { Following } from '@weibo-archiver/core'
import { formatDate, formatNumber } from '@weibo-archiver/core'
import { h } from 'vue'
import Avatar from '@/components/common/Avatar.vue'
import WeiboText from '@/components/weibo/WeiboText'
import { cn } from '@/lib/utils'
import DataTableHeader from './DataTableHeader.vue'

const Text = (text: string, className?: string) => (
  <p class={cn(className)}>
    {text}
  </p>
)

export const columns: ColumnDef<Following>[] = [
  {
    accessorKey: 'avatar',
    header: () => Text('头像', 'text-center'),
    cell: ({ row }) => {
      const uid = row.original.uid
      return (
        <a
          href={`https://weibo.com/u/${uid}`}
          target="_blank"
        >
          <Avatar src={row.getValue('avatar')} />
        </a>
      )
    },
  },
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return h(DataTableHeader, {
        column,
        title: '用户名',
      })
    },
    cell: ({ row }) => {
      const uid = row.original.uid
      return (
        <a
          href={`https://weibo.com/u/${uid}`}
          target="_blank"
          class="hover:text-primary"
        >
          {row.getValue('name')}
        </a>
      )
    },
  },
  {
    accessorKey: 'bio',
    header: () => Text('简介', 'text-center'),
    cell: ({ row }) => <WeiboText text={row.getValue('bio')?.trim() || '暂无简介'} />,
  },
  {
    accessorKey: 'followers',
    header: ({ column }) => {
      return h(DataTableHeader, {
        column,
        title: '粉丝数',
      })
    },
    cell: ({ row }) => Text(
      formatNumber(row.getValue('followers')),
      'text-center',
    ),
  },
  {
    accessorKey: 'followings',
    header: ({ column }) => {
      return h(DataTableHeader, {
        column,
        title: '关注数',
      })
    },
    cell: ({ row }) => Text(
      formatNumber(row.getValue('followings')),
      'text-center',
    ),
  },
  {
    accessorKey: 'location',
    header: () => Text('IP位置', 'text-center w-16'),
    cell: ({ row }) => Text(
      row.getValue('location'),
      'text-center',
    ),
  },
  {
    accessorKey: 'createdAt',
    header: () => Text('微博创建日期', 'text-center'),
    cell: ({ row }) => Text(
      formatDate(row.getValue('createdAt'), 'YYYY年MM月DD日'),
      'w-29',
    ),
  },
]
