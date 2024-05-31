import cytoscape from 'cytoscape'
import { useEffect } from 'react'

export default function G6() {
  useEffect(() => {
    const cy = cytoscape({
      container: document.getElementById('cy'), // container to render in

      elements: [
        {
          data: { id: 'a' }
        },
        {
          data: { id: 'b' }
        },
        {
          data: { id: 'ab', source: 'a', target: 'b' }
        }
      ],

      style: [
        {
          selector: 'node',
          style: {
            'background-color': '#666',
            // label: 'data(id)',
            content: 'asdasd'
          }
        },
        {
          selector: 'edge',
          style: {
            width: 3,
            'line-color': '#ccc',
            'target-arrow-color': '#ccc',
            'target-arrow-shape': 'triangle',
            'curve-style': 'bezier'
          }
        }
      ],
      layout: {
        name: 'grid',
        rows: 1
      }
    })

    console.log(cy.getElementById('a'))

    cy.on('tap', 'node', evt => {
      console.log(evt)
    })

    console.log(cy.json())
  }, [])

  return (
    <div>
      <div id="cy" style={{ width: 500, height: 500 }} className="border"></div>
    </div>
  )
}
