import type { CollectionEntry } from 'astro:content'
import { getGuideBranchRoutePath, getGuidePillarRoutePath, PATH_TO_SENIOR_PILLARS } from '@seniorpath/content'

export type GuideTreeNode = {
  children: GuideTreeNode[]
  depth: number
  guideCount: number
  href: string | null
  key: string
  label: string
  order: number
  postIds: string[]
  posts: CollectionEntry<'guides'>[]
}

type MutableGuideTreeNode = GuideTreeNode & {
  childrenMap: Map<string, MutableGuideTreeNode>
}

export function buildGuideTree(posts: CollectionEntry<'guides'>[], locale = posts[0]?.data.locale ?? 'en'): GuideTreeNode[] {
  const root = new Map<string, MutableGuideTreeNode>()
  const pillarKeyById = new Map<string, string>()
  const branchKeyById = new Map<string, string>()

  for (const pillar of PATH_TO_SENIOR_PILLARS) {
    const pillarNode = createNode({
      depth: 0,
      href: getGuidePillarRoutePath(pillar.id, locale) ? `/${getGuidePillarRoutePath(pillar.id, locale)}` : null,
      key: pillar.title,
      label: pillar.title,
      order: pillar.order,
    })

    root.set(pillarNode.key, pillarNode)
    pillarKeyById.set(pillar.id, pillarNode.key)

    pillar.branches.forEach((branch, branchIndex) => {
      const branchKey = `${pillar.title}>${branch.title}`
      branchKeyById.set(`${pillar.id}:${branch.id}`, branchKey)

      pillarNode.childrenMap.set(
        branchKey,
        createNode({
          depth: 1,
          href: getGuideBranchRoutePath(pillar.id, branch.id, locale)
            ? `/${getGuideBranchRoutePath(pillar.id, branch.id, locale)}`
            : null,
          key: branchKey,
          label: branch.title,
          order: branchIndex,
        }),
      )
    })
  }

  for (const post of sortGuides(posts)) {
    if (post.data.pillarId && post.data.branchId) {
      const pillarKey = pillarKeyById.get(post.data.pillarId)
      const branchKey = branchKeyById.get(`${post.data.pillarId}:${post.data.branchId}`)
      const pillarNode = pillarKey ? root.get(pillarKey) : null
      const branchNode = pillarNode && branchKey ? pillarNode.childrenMap.get(branchKey) : null

      if (branchNode) {
        branchNode.posts.push(post)
        continue
      }
    }

    let currentMap = root

    for (const [index, segment] of post.data.path.entries()) {
      const key = post.data.path.slice(0, index + 1).join('>')
      let node = currentMap.get(key)

      if (!node) {
        node = createNode({
          depth: index,
          href: null,
          key,
          label: segment,
          order: 999,
        })
        currentMap.set(key, node)
      }

      if (index === post.data.path.length - 1) {
        node.posts.push(post)
      }

      currentMap = node.childrenMap
    }
  }

  return materialize(root)
}

function materialize(nodes: Map<string, MutableGuideTreeNode>): GuideTreeNode[] {
  return [...nodes.values()]
    .sort((left, right) => {
      if (left.order !== right.order) {
        return left.order - right.order
      }

      return left.label.localeCompare(right.label)
    })
    .map((node) => {
      const children = materialize(node.childrenMap)
      const posts = sortGuides(node.posts)

      return {
        children,
        depth: node.depth,
        guideCount:
          posts.length + children.reduce((total, child) => total + child.guideCount, 0),
        href: node.href,
        key: node.key,
        label: node.label,
        order: node.order,
        postIds: [
          ...posts.map((post) => post.data.guideId),
          ...children.flatMap((child) => child.postIds),
        ],
        posts,
      }
    })
}

function createNode({
  depth,
  href,
  key,
  label,
  order,
}: Pick<GuideTreeNode, 'depth' | 'href' | 'key' | 'label' | 'order'>): MutableGuideTreeNode {
  return {
    children: [],
    childrenMap: new Map<string, MutableGuideTreeNode>(),
    depth,
    guideCount: 0,
    href,
    key,
    label,
    order,
    postIds: [],
    posts: [],
  }
}

export function sortGuides(posts: CollectionEntry<'guides'>[]) {
  const pillarOrderById = new Map(PATH_TO_SENIOR_PILLARS.map((pillar) => [pillar.id, pillar.order]))
  const branchOrderById = new Map(
    PATH_TO_SENIOR_PILLARS.flatMap((pillar) =>
      pillar.branches.map((branch, branchIndex) => [`${pillar.id}:${branch.id}`, branchIndex] as const),
    ),
  )

  return [...posts].sort((left, right) => {
    const leftPillarOrder = left.data.pillarId ? (pillarOrderById.get(left.data.pillarId) ?? 999) : 999
    const rightPillarOrder = right.data.pillarId ? (pillarOrderById.get(right.data.pillarId) ?? 999) : 999

    if (leftPillarOrder !== rightPillarOrder) {
      return leftPillarOrder - rightPillarOrder
    }

    const leftBranchOrder =
      left.data.pillarId && left.data.branchId
        ? (branchOrderById.get(`${left.data.pillarId}:${left.data.branchId}`) ?? 999)
        : 999
    const rightBranchOrder =
      right.data.pillarId && right.data.branchId
        ? (branchOrderById.get(`${right.data.pillarId}:${right.data.branchId}`) ?? 999)
        : 999

    if (leftBranchOrder !== rightBranchOrder) {
      return leftBranchOrder - rightBranchOrder
    }

    const leftPath = left.data.path.join('>')
    const rightPath = right.data.path.join('>')

    if (leftPath !== rightPath) {
      return leftPath.localeCompare(rightPath)
    }

    if (left.data.order !== right.data.order) {
      return left.data.order - right.data.order
    }

    return left.data.title.localeCompare(right.data.title)
  })
}
