import { gsap } from 'gsap/all'
import { useEffect } from 'react'

// const lenis = new Lenis()
// lenis.on('scroll', e => {
//   console.log(e)
// })
// lenis.on('scroll', ScrollTrigger.update)

// gsap.ticker.add(time => {
//   lenis.raf(time * 1000)
// })
// gsap.ticker.lagSmoothing(0)

function GsapDemo() {
  useEffect(() => {
    // const tl = gsap.timeline({ defaults: { duration: 2, ease: 'none' } })
    // tl.to('#charsUppercase', {
    //   sc: { text: 'UPPERCASE', chars: 'upperCase', speed: 0.3 }
    // })
  }, [])

  const list = Array.from({ length: 100 }, (_, index) => index)

  return <Apple />

  return (
    <div className="overflow-y-auto overflow-x-hidden h-screen">
      {list.map(item => (
        <h1 className="p-6" key={item}>
          {item}
        </h1>
      ))}
    </div>
  )
}

function Apple() {
  // looking for a non-scrubbing version? https://codepen.io/GreenSock/pen/QWYdgjG
  // https://codepen.io/GreenSock/pen/VwgevYW

  useEffect(() => {
    const canvas = document.querySelector('canvas') as HTMLCanvasElement
    const canvasContainer = document.querySelector('.canvas-container')
    const ctx = canvas.getContext('2d')
    const ob = new ResizeObserver(() => {
      canvas.width = canvasContainer.clientWidth
      canvas.height = canvasContainer.clientHeight

      draw(img)
    })

    ob.observe(document.querySelector('.canvas-container'))

    const img = new Image()
    img.src =
      'https://www.apple.com/105/media/us/airpods-pro/2019/1299e2f5_9206_4470_b28e_08307a42f19b/anim/sequence/large/01-hero-lightpass/0081.jpg'

    img.onload = () => {
      draw(img)
    }

    function draw(img: HTMLImageElement) {
      const imgRatio = img.naturalWidth / img.naturalHeight
      const canvasRatio = canvas.width / canvas.height

      if (imgRatio > canvasRatio) {
        const dHeight = canvas.width / imgRatio
        const dy = (canvas.height - dHeight) / 2

        ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight, 0, dy, canvas.width, dHeight)
      } else {
        const dWidth = canvas.height * imgRatio
        const dx = (canvas.width - dWidth) / 2

        ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight, dx, 0, dWidth, canvas.height)
      }
    }

    const frame = 144
    const urls = new Array(frame)
      .fill(null)
      .map(
        (o, i) =>
          `https://www.apple.com/105/media/us/airpods-pro/2019/1299e2f5_9206_4470_b28e_08307a42f19b/anim/sequence/large/01-hero-lightpass/${(
            i + 1
          )
            .toString()
            .padStart(4, '0')}.jpg`
      )

    const images = urls.map((url, i) => {
      let img = new Image()
      img.src = url

      return img
    })

    const playFrame = { frame: 0 }
    let curFrame = -1

    const updateImage = () => {
      const frame = Math.round(playFrame.frame)

      if (frame !== curFrame) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        const img = images[Math.round(playFrame.frame)]

        draw(img)

        curFrame = frame
      }
    }

    gsap.to(playFrame, {
      frame: images.length - 1,
      ease: 'none',
      onUpdate: updateImage,
      duration: images.length / 30,
      scrollTrigger: {
        // scroller: document.querySelector('#scrollContainer'),
        start: 0, // start at the very top
        end: 'max', // entire page
        scrub: true
      }
    })
  }, [])

  return (
    <div id="scrollContainer" className="">
      <div style={{ height: '300vh' }}>
        <div className="canvas-container w-fit sticky top-0 border border-red-200 resize overflow-hidden">
          <canvas className="w-full h-full"></canvas>
        </div>
      </div>
    </div>
  )
}
