import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'

const useCountDown = (initialCount: number) => {
  const [count, setCount] = useState(initialCount)

  useEffect(() => {
    let timer: NodeJS.Timeout

    timer = setInterval(() => {
      setCount(_count => {
        const nv = _count - 1

        if (nv === 0) {
          clearInterval(timer)
        }

        return nv
      })
    }, 1000)
  }, [])

  return count
}

const Misc = () => {
  const count = useCountDown(4)

  return (
    <div>
      remote：
      <button
        className="disabled:cursor-not-allowed disabled:bg-gray-200"
        disabled={count > 0}
        onClick={() => {
          console.log('抢券')
        }}
      >
        {count}
      </button>
    </div>
  )
}

export default Misc

const data = [
  { id: 1, name: 'John', age: 8 },
  { id: 10, name: 'aa', age: 11 },
  { id: 9, name: 'bb', age: 13 },
  { id: 3, name: 'aa', age: 55 },
  { id: 8, name: 'dd', age: 13 },
  { id: 5, name: 'ee', age: 20 },
  { id: 4, name: 'John', age: 30 }
]

// const ans = query(data)
//   .where(item => item.age > 0)
//   .sortBy('id')
//   .groupBy('name')
//   .execute()

// console.log(ans)

function query<T extends Record<string, any>>(data: T[]) {
  type GroupItem = T[]
  class Q {
    constructor(data: T[]) {
      this.arrayData = data
    }

    arrayData: (GroupItem | T)[]

    tasks: Function[] = []

    where(filterFunc: (value: T, index: number, array: T[]) => boolean) {
      const whereTask = () => {
        console.log('whereTask')
        this.arrayData = this.arrayData.filter(filterFunc)
      }
      this.tasks.push(whereTask)

      return this
    }

    sortBy(sortKey: string) {
      const sortByTask = () => {
        console.log('sortByTask')
        this.arrayData = this.arrayData.sort((a, b) => a[sortKey] - b[sortKey])
      }
      this.tasks.push(sortByTask)

      return this
    }

    groupBy(groupKey: string) {
      const groupByTask = () => {
        console.log('groupByTask')
        const keys = new Set(this.arrayData.map(item => item[groupKey]))

        const ans: GroupItem[] = []

        for (const key of keys) {
          const gItem = (this.arrayData as T[]).filter(item => item[groupKey] === key)
          ans.push(gItem)
        }

        this.arrayData = ans
      }
      this.tasks.push(groupByTask)

      return this
    }

    execute() {
      this.tasks.forEach(taskItem => taskItem())

      return this.arrayData
    }
  }

  return new Q(data)
}
