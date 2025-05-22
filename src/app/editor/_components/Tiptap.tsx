'use client'

import axios from 'axios';
import styles from './css/tiptap.module.css';
import Blockquote from '@tiptap/extension-blockquote';
import Bold from '@tiptap/extension-bold';
import Highlight from '@tiptap/extension-highlight'
import ListItem from '@tiptap/extension-list-item'
import OrderedList from '@tiptap/extension-ordered-list'
import BulletList from '@tiptap/extension-bullet-list';
import Italic from '@tiptap/extension-italic'
import Link from '@tiptap/extension-link'
import History from '@tiptap/extension-history';
import {YouTube} from './extensions/Youtube';

import Image from '@tiptap/extension-image';
import { useEditor, EditorContent, ReactNodeViewRenderer } from '@tiptap/react'
import Heading from '@tiptap/extension-heading';
import Document from '@tiptap/extension-document';
import Gapcursor from '@tiptap/extension-gapcursor';
import Paragraph from '@tiptap/extension-paragraph';
import Table from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';
import Text from '@tiptap/extension-text';
import { useCallback, useEffect, useRef, useState } from 'react';
import {TextBox} from './extensions/TextBox';
import FileHandler from '@tiptap-pro/extension-file-handler';
import TextAlign from '@tiptap/extension-text-align';
import Strike from '@tiptap/extension-strike';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import Underline from '@tiptap/extension-underline';
import Emoji, { gitHubEmojis } from '@tiptap-pro/extension-emoji';
import { EmojiCommand } from './extensions/EmojiCommand';
import {EmojiPicker} from './EmojiPicker';
import SVGIcon from '@/app/_components/SVGIcon';
import { HighlightMenu } from '@/app/_components/HighlightMenu';
import HardBreak from '@tiptap/extension-hard-break';
import { useRouter } from 'next/navigation';
import LoadingSpinner from '@/app/_components/LoadingSpinner';
import { ImageWithCaption } from '../_components/extensions/ImageWithCaption';
import PublishSettingsModal from './PublishSettingsModal';
import { CustomParagraph } from './extensions/CustomParagraph';
import { ResizableImage } from './extensions/ResizableImage';
import { useEditStore } from '@/store/editStore';
import FontOptions from './FontOptions';
import { Content } from '@/model/Content';

Table.configure({
  HTMLAttributes: {
    class: 'my-custom-class',
  },
})

interface Position {
  top: number
  left: number
}

interface Props{
  detaildata ?: Content
  isEdit : boolean
}

export default function TiptapEditor({detaildata, isEdit}:Props) {
  const {count,increase,decrease,reset} = useEditStore();
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/manager');
      }
    }
  }, [])
    
    
  const [loading, setLoading] = useState<boolean>(true);
  const [showPicker, setShowPicker] = useState(false)
  const [position] = useState<Position>({ top: 0, left: 0 })
  const [status] = useState<'draft'| 'scheduled'| 'published'>('draft'); // 예시로 string
  const [title, setTitle] = useState('');
  //테이블 위젯
  const [showPopup, setShowPopup] = useState(false);
  const [popupPos,setPopupPos] = useState({ top: 0, left: 0 });
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isScheduled, setisScheduled] = useState<boolean>(false);
  const widgetRef = useRef<HTMLDivElement | null>(null);
  const [isWidgetPositioned, setIsWidgetPositioned] = useState(false);
  const editor = useEditor({
    extensions: [
      CustomParagraph,
      EmojiCommand,
      // StarterKit,
      Document,
      Highlight.configure({ multicolor: true }),
      Italic,
      History,
      Gapcursor,
      OrderedList, ListItem,Strike,Subscript,Superscript,Underline,BulletList,
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: 'https',
        protocols: ['http', 'https'],
        isAllowedUri: (url, ctx) => {
          try {
            // construct URL
            const parsedUrl = url.includes(':') ? new URL(url) : new URL(`${ctx.defaultProtocol}://${url}`)

            // use default validation
            if (!ctx.defaultValidate(parsedUrl.href)) {
              return false
            }

            // disallowed protocols
            const disallowedProtocols = ['ftp', 'file', 'mailto']
            const protocol = parsedUrl.protocol.replace(':', '')

            if (disallowedProtocols.includes(protocol)) {
              return false
            }

            // only allow protocols specified in ctx.protocols
            const allowedProtocols = ctx.protocols.map(p => (typeof p === 'string' ? p : p.scheme))

            if (!allowedProtocols.includes(protocol)) {
              return false
            }

            // disallowed domains
            const disallowedDomains = ['example-phishing.com', 'malicious-site.net']
            const domain = parsedUrl.hostname

            if (disallowedDomains.includes(domain)) {
              return false
            }

            // all checks have passed
            return true
          } catch {
            return false
          }
        },
        shouldAutoLink: url => {
          try {
            // construct URL
            const parsedUrl = url.includes(':') ? new URL(url) : new URL(`https://${url}`)

            // only auto-link if the domain is not in the disallowed list
            const disallowedDomains = ['example-no-autolink.com', 'another-no-autolink.com']
            const domain = parsedUrl.hostname

            return !disallowedDomains.includes(domain)
          } catch {
            return false
          }
        },

      }),
      Blockquote,
      Paragraph,
      Text,
      Image,
      ResizableImage,
      YouTube,
      Bold,
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      Gapcursor,
      TextBox,
      Heading,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      // Emoji.configure({
      //   emojis: gitHubEmojis,
      //   enableEmoticons: true,
      //   suggestion,
      // }),
      FileHandler.configure({
        allowedMimeTypes: ['image/png', 'image/jpeg', 'image/gif', 'image/webp'],
        onDrop: (currentEditor, files, pos) => {
          files.forEach(file => {
            const fileReader = new FileReader()

            fileReader.readAsDataURL(file)
            fileReader.onload = () => {
              currentEditor.chain().insertContentAt(pos, {
                type: 'image',
                attrs: {
                  src: fileReader.result,
                },
              }).focus().run()
            }
          })
        },
        onPaste: (currentEditor, files, htmlContent) => {
          files.forEach(file => {
            if (htmlContent) {
              // if there is htmlContent, stop manual insertion & let other extensions handle insertion via inputRule
              // you could extract the pasted file from this url string and upload it to a server for example
              console.log(htmlContent) // eslint-disable-line no-console
              return false
            }

            const fileReader = new FileReader()

            fileReader.readAsDataURL(file)
            fileReader.onload = () => {
              currentEditor.chain().insertContentAt(currentEditor.state.selection.anchor, {
                type: 'image',
                attrs: {
                  src: fileReader.result,
                },
              }).focus().run()
            }
          })
        },
      }),
      Emoji.configure({
        emojis: gitHubEmojis,
      }),
      HardBreak.extend({
        addKeyboardShortcuts() {
          return {
            'Shift-Enter': () => this.editor.commands.setHardBreak(),
          };
        },
      }),
      ImageWithCaption
    ],
    content:``,
  })

  
  useEffect(() => {
    if (editor && detaildata) {
      setTitle(detaildata.title);
      editor.commands.setContent(detaildata.content);
      setThumbnailPreview(detaildata.thumbnail)
    }
  }, [editor, detaildata])

  useEffect(() => {
    if (isWidgetPositioned) return;
    const tableWrapper = document.querySelector('.tableWrapper') as HTMLElement;
    if (tableWrapper && widgetRef.current) {
      const rect = tableWrapper.getBoundingClientRect();
      widgetRef.current.style.position = 'absolute';
      widgetRef.current.style.top = popupPos.top.toString();
      // `${rect.top - 50}px`;
      widgetRef.current.style.left = `${rect.left }px`;
      setIsWidgetPositioned(true); // ⛔ 이후 재실행 안 되게 막는다
    }
    setLoading(false);
  }, [widgetRef]);

//@todo S3에 맞게 변경
const addImage = useCallback(() => {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = 'image/*'
  input.onchange = async () => {
    const file = input.files?.[0]
    if (!file) return

    const blobUrl = URL.createObjectURL(file)

    // 현재 에디터에 blob 이미지 삽입 (작성 중에는 이걸로 표시)
    // editor?.chain().focus().setImage({ src: blobUrl }).run()
    editor?.chain().focus().insertContent({
      type: 'resizableImage',
      attrs: {
        src:blobUrl,
        width: 300,
      },
    }).run();

    // 별도로 업로드 목록에 저장해둘 수도 있음 (opt)
    // setPendingImages(prev => [...prev, { blobUrl, file }])
  }
  input.click()
}, [editor])

  const [thumbnailPreview, setThumbnailPreview] = useState<string | ArrayBuffer | null>('')
  const [thumbnail, setThumbnail] = useState<File | null>(null);

  const handleThumbnailUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    // const file = e.target.files?.[0]
    // if (!file) return
    // const reader = new FileReader();
    // reader.readAsDataURL(file);
    // reader.onloadend = () => {
    //   setThumbnail(reader.result);
   	// };
    
    if(detaildata?.thumbnail && !file){
      setThumbnailPreview(detaildata?.thumbnail);
      return;
    }

    if (!file || !file.type.startsWith('image/')) return
    // 파일 상태값 세팅
    setThumbnail(file);
    const objectURL = URL.createObjectURL(file)
    // 썸네일 스트링값 세팅
    setThumbnailPreview(objectURL);
    // 업로드는 따로 처리
    // uploadToServer(file)
  }
    // 🔥 붙여넣기 감지 (한 번만 등록)
    useEffect(() => {
      if (!editor) return
  
      const handlePaste = (event: ClipboardEvent) => {
        const text = event.clipboardData?.getData('text/plain') ?? ''
        const match = text.match(
          /(?:youtu\.be\/|youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/
        )
        if (match) {
          const videoId = match[1]
          const src = `https://www.youtube.com/embed/${videoId}`
          event.preventDefault()
          editor.commands.setYouTubeVideo(src)
        }
      }
  
      // 등록
      editor.view.dom.addEventListener('paste', handlePaste)
  
      // 해제
      return () => {
        editor.view.dom.removeEventListener('paste', handlePaste);
        editor?.destroy();
      }
    }, [editor]);

    if (!editor) return null
    
    // const handleEmojiSelect = (emoji: string) => {
    //   editor?.commands.insertEmoji(emoji)
    //   setShowPicker(false)
    // }
    const handleEmojiSelect = (emoji: string) => {
      editor?.commands.insertEmoji(emoji)
      setShowPicker(false)
    }
  
    
    editor.on('selectionUpdate', () => {
      const { from } = editor.state.selection
      const domAtPos = editor.view.domAtPos(from)
    
      // 테이블 셀 클릭 여부 확인
      const domNode = domAtPos.node as HTMLElement
      if (domNode.closest('th') || domNode.closest('td')) {
        // 위치 계산 후 "..." 메뉴 띄우기
        const cell = domNode.closest('table');
        const rect = cell?.getBoundingClientRect()
    
        if (rect) {
          setPopupPos({ top: rect.top + 50, left: rect.left - 300 + rect.width - 20 })
          setShowPopup(true)
        }
      } else {
        setShowPopup(false)
      }
    })

    const backUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}`;
    
    // 텍스트 에디터 내의 이미지를 s3에 업로드
    const uploadToS3 = async (file: File): Promise<string> => {
      const res = await fetch(`${backUrl}/api/presign`, {
        method: 'POST',
        body: JSON.stringify({
          filename: file.name,
          contentType: file.type || 'image/jpeg',
        }),
        headers: { 'Content-Type': 'application/json' },
      });
    
      const { url, publicUrl } = await res.json();
    
      const uploadRes = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': file.type || 'image/jpeg',
        },
        body: file,
      });
    
      if (!uploadRes.ok) {
        const errText = await uploadRes.text();
        console.error('❌ S3 업로드 실패:', errText);
        throw new Error('S3 upload failed');
      }
    
      return publicUrl;
    };

    // 썸네일을 s3에 업로드
    const uploadThumbnailToS3 = async (file: File | null): Promise<string> => {
      const res = await fetch(`${backUrl}/api/presign`, {
        method: 'POST',
        body: JSON.stringify({
          filename: `thumbnail/${Date.now()}-${file?.name}`, // 썸네일 전용 경로
          contentType: file?.type || 'image/jpeg',
        }),
        headers: { 'Content-Type': 'application/json' },
      });
    
      const { url, publicUrl } = await res.json();
    
      const uploadRes = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': file?.type || 'image/jpeg',
        },
        body: file,
      });
    
      if (!uploadRes.ok) {
        const errText = await uploadRes.text();
        console.error('❌ 썸네일 S3 업로드 실패:', errText);
        throw new Error('Thumbnail S3 upload failed');
      }
    
      return publicUrl;
    };
    

    const handleSubmit = async () => {
      setLoading(true);
      if(!title){
        alert('제목을 입력하세요 !')
        return;
      }
      const html = editor?.getHTML();
      if (!html) return;
    
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html')
      const imgElements = Array.from(doc.querySelectorAll('img[src^="blob:"]'))
    
      for (const imgele of imgElements) {
        const img = imgele as HTMLImageElement
        const blobUrl = img.src
        const blob = await fetch(blobUrl).then(res => res.blob())
        const file = new File([blob], `text_editor-${Date.now()}.jpg`, { type: blob.type??'image/jpeg' })
    
        const s3Url = await uploadToS3(file) // ✅ presign 방식으로 업로드
        img.src = s3Url // 변경!
      }
    
      const finalContent = doc.body.innerHTML
      const thumbnail_S3 = await uploadThumbnailToS3(thumbnail);
      // 이제 서버로 저장
      try {
        // editor.getHTML()
        const apiPath = isEdit
        ? `/api/update/${detaildata?.id}`
        : '/api/save';
      
      const endUrl = isEdit
        ? `/posts/${detaildata?.id}`
        : '/home';
      
      const payload = {
        title,
        content: finalContent,
        status,
        thumbnail: thumbnail_S3,
        _id:detaildata?._id
      };
      
      const res = isEdit
        ? await axios.put(apiPath, payload)
        : await axios.post(apiPath, payload);

        if(res.status <= 201 ){
          setLoading(false);
          //성공 시 홈으로
          router.push(endUrl);
        }
      } catch (err) {
        console.error('❌ 저장 실패', err);
      }
    }
    // const handleSave = async () => {
    //   setLoading(true);
    //   try {
    //     const res = await axios.post('/api/save', { title,content: editor.getHTML(), status, thumbnail});
    //     if(res.status <= 201 ){
    //       setLoading(false);
    //       //성공 시 홈으로
    //       router.push('/home');
    //     }
    //   } catch (err) {
    //     console.error('❌ 저장 실패', err);
    //   }
    // };

    // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //   setStatus(e.target.value as Status)
    // }

    const handleHighlightColor = (color: string) => {
      editor.chain().focus().toggleHighlight({ color }).run();
    };

  return (
      <div className={`${styles['control-group']}` }>
      <div className={`${styles.button_group}`}>
            {/* 폰트 커스텀 셀렉트 박스 */}
            <FontOptions editor={editor}/>
            <button
                onClick={() => setShowPicker(prev => !prev)}
                // style={{background:'black'}}
              >
                <SVGIcon id="sentiment-satisfied" />
              </button>
              {showPicker && editor && (
                <EmojiPicker
                onSelect={handleEmojiSelect}
                position={position}
              />
              )}
            <button
              onClick={() => {
                const input = prompt('YouTube URL 또는 Video ID를 입력하세요 (예: dQw4w9WgXcQ 또는 https://www.youtube.com/watch?v=dQw4w9WgXcQ)');
                if (!input) return;
  
                let videoId = '';
  
                try {
                  const url = new URL(input);
                  videoId = url.searchParams.get('v') || ''; // watch?v=xxxx 형태
                  if (!videoId && url.hostname === 'youtu.be') {
                    videoId = url.pathname.slice(1); // youtu.be/xxxx 형태
                  }
                } catch {
                  // URL이 아닌 경우 그냥 ID라고 가정
                  videoId = input;
                }
  
                if (videoId) {
                  const src = `https://www.youtube.com/embed/${videoId}`;
                  editor?.commands.setYouTubeVideo(src);
                } else {
                  alert('유효한 YouTube URL 또는 ID가 아닙니다.');
                }
              }}
            >
              <SVGIcon id="youtube-activity" />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={editor.isActive('bulletList') ? 'is-active' : ''}
            >
              <SVGIcon id="list-bullet"/>
            </button>
            <button
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              className={editor.isActive('underline') ? 'is-active' : ''}
            >
              <SVGIcon id="underlined" />
            </button>
            {/* <button
              onClick={() => editor.chain().focus().setUnderline().run()}
              disabled={editor.isActive('underline')}
            >
              Set underline
            </button>
            <button
              onClick={() => editor.chain().focus().unsetUnderline().run()}
              disabled={!editor.isActive('underline')}
            >
              Unset underline
            </button> */}
            {/* <button
              onClick={() => editor.chain().focus().toggleHighlight().run()}
              className={editor.isActive('highlight') ? 'is-active' : ''}
            >
              <SVGIcon id="ink-highlighter"/>
            </button> */}
            <HighlightMenu
              onSelect={handleHighlightColor}
              isActive={editor.isActive('highlight')}
              activeColor={editor.getAttributes('highlight')?.color}
            />
            {/* <button
              onClick={() => editor.chain().focus().unsetHighlight().run()}
              disabled={!editor.isActive('highlight')}
            >
              Unset highlight
            </button> */}
          <button
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={`bg-blue-500 text-white px-4 py-2 rounded ${editor.isActive('bold') ? 'is-active' : ''}`}
            >
              <SVGIcon id="bold" />
          </button>
          <button
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              className={editor.isActive('blockquote') ? 'is-active' : ''}
          >
            <SVGIcon id="format-quote" />
          </button>
          <button onClick={addImage}><SVGIcon id="format-image"/></button>
            <button
              onClick={() => editor.chain().focus().insertContent({
                type: 'textBox',
                content: [
                  {
                    type: 'paragraph',
                    content: [{ type: 'text', text: '텍스트 박스입니다!' }],
                  },
                ],
              }).run()
              }
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              <SVGIcon id="text-box" />
           </button>
            <button className ={styles.editorBox}
              onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: false  }).run()}>
              <SVGIcon id="table" />
            </button>
            <button className ={styles.editorBox} onClick={() => editor.chain().focus().mergeCells().run()}><SVGIcon id='cell-merge' /></button>
            {/* 테이블 관련 start */}
            {/* <button className ={styles.editorBox} onClick={() => editor.chain().focus().addColumnBefore().run()}>
              Add column before
            </button>
            <button className ={styles.editorBox} onClick={() => editor.chain().focus().addColumnAfter().run()}>Add column after</button>
            <button className ={styles.editorBox} onClick={() => editor.chain().focus().deleteColumn().run()}>Delete column</button>
            <button className ={styles.editorBox} onClick={() => editor.chain().focus().addRowBefore().run()}>Add row before</button>
            <button className ={styles.editorBox} onClick={() => editor.chain().focus().addRowAfter().run()}>Add row after</button>
            <button className ={styles.editorBox} onClick={() => editor.chain().focus().deleteRow().run()}>Delete row</button>
            <button className ={styles.editorBox} onClick={() => editor.chain().focus().deleteTable().run()}>Delete table</button>
            <button className ={styles.editorBox} onClick={() => editor.chain().focus().splitCell().run()}>Split cell</button>
            <button className ={styles.editorBox} onClick={() => editor.chain().focus().toggleHeaderColumn().run()}>
              Toggle header column
            </button> 
            <button className ={styles.editorBox} onClick={() => editor.chain().focus().toggleHeaderRow().run()}>
              Toggle header row
            </button>
            <button className ={styles.editorBox} onClick={() => editor.chain().focus().toggleHeaderCell().run()}>
              Toggle header cell
            </button>
            <button className ={styles.editorBox} onClick={() => editor.chain().focus().mergeOrSplit().run()}>Merge or split</button>
            <button className ={styles.editorBox} onClick={() => editor.chain().focus().setCellAttribute('colspan', 2).run()}>
              Set cell attribute
            </button>
            <button className ={styles.editorBox} onClick={() => editor.chain().focus().fixTables().run()}>Fix tables</button>
            <button className ={styles.editorBox} onClick={() => editor.chain().focus().goToNextCell().run()}>Go to next cell</button>
            <button className ={styles.editorBox} onClick={() => editor.chain().focus().goToPreviousCell().run()}>
              Go to previous cell
            </button>
            */}
            {/* 테이블 관련 end*/}
            <button
              onClick={() => editor.chain().focus().setTextAlign('left').run()}
              className={`${editor.isActive({ textAlign: 'left' }) ? 'is-active' : ''}`}
            >
              <SVGIcon id="align-left"/>
            </button>
            <button
              onClick={() => editor.chain().focus().setTextAlign('center').run()}
              className={`${editor.isActive({ textAlign: 'center' }) ? 'is-active' : ''}`}
            >
              <SVGIcon id="align-center"/>
            </button>
            <button
              onClick={() => editor.chain().focus().setTextAlign('right').run()}
              className={`${editor.isActive({ textAlign: 'right' }) ? 'is-active' : ''}`}
            >
              <SVGIcon id="align-right"/>
            </button>
            {/* <button
              onClick={() => {
                const currentClass = editor.getAttributes('paragraph').class || '';
                const headlineL = typeof currentClass === 'string' && currentClass.includes('headlineL');
  
                editor.chain().focus().updateAttributes('paragraph', {
                  class: headlineL ? null : 'headlineL',
                }).run();
              }}
              className={editor.getAttributes('paragraph').class === 'headlineL' ? 'is-active' : ''}>
            <SVGIcon id="h1"/>
          </button>
            <button
              onClick={() => {
                const currentClass = editor.getAttributes('paragraph').class || '';
                const headlineM = typeof currentClass === 'string' && currentClass.includes('headlineM');
  
                editor.chain().focus().updateAttributes('paragraph', {
                  class: headlineM ? null : 'headlineM',
                }).run();
              }}
              className={editor.getAttributes('paragraph').class === 'headlineM' ? 'is-active' : ''}
            >
              <SVGIcon id="h2" />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
              className={`${editor.isActive({ level: 3 }) ? 'is-active' : ''}`}
            >
              <SVGIcon id="h3" />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
              className={`${editor.isActive({ level: 4 }) ? 'is-active' : ''}`}
            >
              <SVGIcon id="h4" />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
              className={`${editor.isActive({ level: 5 }) ? 'is-active' : ''}`}
            >
              <SVGIcon id="h5" />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
              className={`${editor.isActive({ level: 6 }) ? 'is-active' : ''}`}
            >
              <SVGIcon id="h6" />
            </button> */}
            <label 
            title='썸네일'
            className={`${styles.label_thumbnail}`} htmlFor='thumbnail'
            >
              <SVGIcon id="format-thumbnail" />
              <input type="file" id="thumbnail" className={styles.thumbnailUpload} onChange={handleThumbnailUpload} style={{color:'black'}} />
            </label>
      </div>
      <div className={styles.titleContainer}>
        <input className={``} value={title||''} onChange={(e)=>setTitle(e.target.value)} placeholder='제목을 입력하세요'/>
      </div>
      {showPopup && (
        <div
          ref={widgetRef}
          style={{ 
            position:'absolute',top: popupPos.top - 150, left: popupPos.left - 550, border : '1px solid var(--gray-300)',
            display:'flex', alignItems:'center',justifyContent:'center'
          }}
        >
          <button onClick={() => editor.chain().focus().addColumnAfter().run()}><SVGIcon id="add-column-right" /></button>
          <button onClick={() => editor.chain().focus().deleteColumn().run()}><SVGIcon id="table-delete-column" /></button>
          <button onClick={() => editor.chain().focus().mergeCells().run()}><SVGIcon id="cell-merge" /></button>
        </div>
      )}
        <EditorContent editor={editor} className={styles.tiptap} />
        {thumbnailPreview && <img src={ (thumbnailPreview !== '' && typeof thumbnailPreview === 'string') ? thumbnailPreview : '/default.png'} alt="썸네일 미리보기" style={{width:'auto',height:'auto', maxWidth:'300px', maxHeight:'300px', fill:'true', objectFit:'contain'}}/>}
        <div>
        {/* <label>
          <input
            type="radio"
            name="status"
            value="draft"
            checked={status === 'draft'}
            onChange={handleChange}
          />
          Draft
        </label>
        
        <label>
          <input
            type="radio"
            name="status"
            value="scheduled"
            checked={status === 'scheduled'}
            onChange={handleChange}
          />
          Scheduled
        </label>
  
        <label>
          <input
            type="radio"
            name="status"
            value="published"
            checked={status === 'published'}
            onChange={handleChange}
          />
          Published
        </label> */}
        {/* <p>현재 상태: <strong>{status}</strong></p> */}
      </div>
      <div className={`${styles['content-aside']} ${isOpen && styles.none}`}>
        <button 
        onClick={()=>{
          if(!title) {
            const titleInput = document.querySelector(`.${styles.titleContainer} > input`);
            titleInput?.classList.add('red');
            return;
          };
          setIsOpen(!isOpen)
          if(isOpen === true){
            handleSubmit();
          }
        }}
        className={`${styles.editcomplete}`}>완료</button>
      </div>
        {loading && <LoadingSpinner />}
        {/* <p>
          <strong>HTML Output:</strong>
        </p>
        <div
        className={styles.gethtml}
        style={{ 
          // width:'700px',
          wordBreak: 'break-word'
        }}
        dangerouslySetInnerHTML={{ __html: editor.getHTML() }} />
        <div style={{
          width:'100%',
          wordBreak:'break-all'
        }}>{editor.getHTML()}</div> */}
      { 
        <PublishSettingsModal 
          isOpen={isOpen}
          title={'제목 프롭스'} 
          publishDate={new Date().toString()}
          isScheduled={isScheduled}
          setisScheduled={setisScheduled}
          onChangePublishDate={()=>{}}
          onClose={()=>{setIsOpen(false)}}
          onConfirm={()=>handleSubmit()}
          thumbnailBlob={thumbnailPreview}
        />
      }
      </div>
  )
}
