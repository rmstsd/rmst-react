import { CKEditor } from '@ckeditor/ckeditor5-react'
import { ClassicEditor, Essentials, Paragraph, Bold, Italic } from 'ckeditor5'

import 'ckeditor5/ckeditor5.css'

export default function Ckeditor() {
  return (
    <div>
      <CKEditor
        editor={ClassicEditor}
        config={{
          licenseKey: 'GPL',
          plugins: [Essentials, Paragraph, Bold, Italic],
          toolbar: ['undo', 'redo', '|', 'bold', 'italic', '|'],
          initialData: '<p>Hello from CKEditor 5 in React!</p>'
        }}
      />
    </div>
  )
}
