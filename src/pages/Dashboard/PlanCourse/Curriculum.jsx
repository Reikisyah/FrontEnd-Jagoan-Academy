import React, { useState, useEffect } from 'react'
import DashboardHeader from '../../../components/DashboardHeader'
import Tab from '../../../components/Tab'
import {
  FaPlus,
  FaRegEdit,
  FaTrash,
  FaChevronDown,
  FaChevronUp,
  FaRegFileAlt,
  FaGripVertical,
  FaRegCircle,
} from 'react-icons/fa'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import {
  getChaptersByCourseId,
  addChapter,
  updateChapter,
  deleteChapter,
  deleteSubChapter,
  addSubChapter,
  updateSubChapter,
  updateSubChapterOrder,
} from '../../../utils/api/chapterApi'
import { addResource, deleteResource } from '../../../utils/api/resourceApi'
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

const initialSection = {
  title: '',
  items: [
    {
      type: 'lecture', // 'lecture', 'quiz', 'assignment'
      contentType: 'video', // 'video' atau 'slide' (khusus lecture)
      title: 'Introduction',
      preview: '',
      description: '',
      resources: [],
      expanded: true,
      editing: false,
    },
  ],
  expanded: true,
  editing: false,
}

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)
  return result
}

// Helper untuk ambil thumbnail YouTube
const getYouTubeThumbnail = (url) => {
  if (!url) return null
  // Regex ambil video ID dari berbagai format YouTube
  const match = url.match(
    /(?:youtube\.com\/(?:.*v=|v\/|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/,
  )
  if (match && match[1]) {
    return `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg`
  }
  return null
}

const Curriculum = () => {
  const [sections, setSections] = useState([])
  const [newSection, setNewSection] = useState('')
  const [showContentType, setShowContentType] = useState(null) // index of item
  const [editingSectionIdx, setEditingSectionIdx] = useState(null)
  const [editingItem, setEditingItem] = useState({
    sectionIdx: null,
    itemIdx: null,
  })
  const [editSectionTitle, setEditSectionTitle] = useState('')
  const [editItemTitle, setEditItemTitle] = useState('')
  const [addType, setAddType] = useState('lecture')

  // State untuk add item pertama di section baru
  const [addItemSectionIdx, setAddItemSectionIdx] = useState(null)
  const [firstItemType, setFirstItemType] = useState('lecture')

  // State untuk deskripsi dan resource sementara (inline edit)
  const [descEdit, setDescEdit] = useState({
    sectionIdx: null,
    itemIdx: null,
    value: '',
  })
  const [resourceEdit, setResourceEdit] = useState({
    sectionIdx: null,
    itemIdx: null,
  })

  // Tambahkan state loading dan error
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Tambahkan state untuk konten video/slide
  const [contentEdit, setContentEdit] = useState({
    sectionIdx: null,
    itemIdx: null,
    value: '',
    file: null,
  })

  // Ambil course dari localStorage
  let course = null
  const saved = localStorage.getItem('lastCourse')
  if (saved) course = JSON.parse(saved)

  // Refetch data dari backend
  const fetchSections = async () => {
    if (course?.id) {
      setLoading(true)
      setError(null)
      try {
        const data = await getChaptersByCourseId(course.id)
        const mapped = (data || []).map((chapter) => ({
          title: chapter.title,
          id: chapter.id,
          items: (chapter.sub_chapters || []).map((sub) => ({
            id: sub.id, // pastikan id sub-chapter ada
            type:
              sub.content_type === 'video'
                ? 'lecture'
                : sub.content_type || 'lecture',
            contentType: sub.content_type || 'video',
            title: sub.title,
            preview: sub.content_link || '',
            content_link: sub.content_link || '', // <--- tambahkan ini
            content_file: sub.content_file || '', // <--- tambahkan ini
            description: sub.description || '',
            resources: sub.resources || [], // pastikan ini benar
            expanded: false,
            editing: false,
            subSubs: sub.sub_sub_chapters || [],
          })),
          expanded: false,
          editing: false,
        }))
        setSections(mapped)
      } catch (err) {
        setError(err.message)
        setSections([])
      } finally {
        setLoading(false)
      }
    }
  }

  // Gunakan fetchSections di useEffect
  useEffect(() => {
    fetchSections()
    // eslint-disable-next-line
  }, [course?.id])

  // Tambah Section (chapter)
  const handleAddSection = async (e) => {
    e.preventDefault()
    // Validasi FE: hanya title yang wajib
    if (!newSection.trim()) {
      setError('Judul section (title) wajib diisi.')
      return
    }
    if (!course?.id) {
      setError('Course ID tidak ditemukan.')
      return
    }
    if (sections.length === undefined) {
      setError('Order section tidak valid.')
      return
    }
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Tambah section baru?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#e11d48',
      cancelButtonColor: '#aaa',
      confirmButtonText: 'Yes',
      customClass: { popup: 'rounded-xl' },
    })
    if (!result.isConfirmed) return
    setLoading(true)
    setError(null)
    try {
      const response = await addChapter({
        course_id: course.id,
        title: newSection,
        order: sections.length,
        // description tidak dikirim
      })
      console.log('Add Chapter Response:', response)
      setNewSection('')
      fetchSections()
      await Swal.fire({
        icon: 'success',
        title: 'Section added!',
        showConfirmButton: false,
        timer: 1200,
        customClass: { popup: 'rounded-xl' },
        position: 'center',
      })
    } catch (err) {
      // Tangani error dari addChapter yang melempar {status, response}
      if (err && err.status && err.response) {
        console.log('Add Chapter Error Response:', err.response)
        if (err.response.errors) {
          const messages = Object.values(err.response.errors).flat().join(', ')
          setError(messages)
        } else if (err.response.message) {
          setError(err.response.message)
        } else {
          setError('Validation error')
        }
      } else {
        console.log('Add Chapter Error:', err)
        setError(err.message)
      }
    } finally {
      setLoading(false)
    }
  }

  // Expand/collapse section
  const handleToggleExpand = (idx) => {
    setSections(
      sections.map((s, i) => (i === idx ? { ...s, expanded: !s.expanded } : s)),
    )
  }

  // Add new item to section
  const handleAddItem = async (sectionIdx, type) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Tambah item baru ke section ini?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#e11d48',
      cancelButtonColor: '#aaa',
      confirmButtonText: 'Yes',
      customClass: { popup: 'rounded-xl' },
    })
    if (!result.isConfirmed) return
    setLoading(true)
    setError(null)
    try {
      const section = sections[sectionIdx]
      // Validasi
      if (!section.id) throw new Error('Section belum tersimpan di backend')
      // Siapkan payload
      const payload = {
        chapter_id: section.id,
        title:
          type === 'lecture'
            ? 'New Lecture'
            : type === 'quiz'
              ? 'New Quiz'
              : 'New Assignment',
        type,
        order: (section.items?.length || 0) + 1,
        content_type: type === 'lecture' ? 'video' : undefined,
      }
      // Hapus content_type jika bukan lecture
      if (type !== 'lecture') delete payload.content_type
      const resp = await addSubChapter(payload)
      console.log('Add sub-chapter response:', resp)
      fetchSections()
      await Swal.fire({
        icon: 'success',
        title: 'Item added!',
        showConfirmButton: false,
        timer: 1200,
        customClass: { popup: 'rounded-xl' },
        position: 'center',
      })
    } catch (err) {
      setError(err.message)
      console.log('Add sub-chapter error:', err)
    } finally {
      setLoading(false)
    }
  }

  // Hapus section (chapter)
  const handleDeleteSection = async (idx) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Yakin ingin menghapus section ini?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#e11d48',
      cancelButtonColor: '#aaa',
      confirmButtonText: 'Yes',
      customClass: { popup: 'rounded-xl' },
    })
    if (!result.isConfirmed) return
    setLoading(true)
    setError(null)
    try {
      const section = sections[idx]
      await deleteChapter(section.id)
      fetchSections()
      await Swal.fire({
        icon: 'success',
        title: 'Section deleted!',
        showConfirmButton: false,
        timer: 1200,
        customClass: { popup: 'rounded-xl' },
        position: 'center',
      })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // Hapus item (sub-chapter) ke backend jika ada id, lalu refetch
  const handleDeleteItem = async (sectionIdx, itemIdx) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Yakin ingin menghapus item ini?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#e11d48',
      cancelButtonColor: '#aaa',
      confirmButtonText: 'Yes',
      customClass: { popup: 'rounded-xl' },
    })
    if (!result.isConfirmed) return
    setLoading(true)
    setError(null)
    try {
      const item = sections[sectionIdx].items[itemIdx]
      if (item.id) {
        console.log('Deleting sub-chapter id:', item.id)
        const resp = await deleteSubChapter(item.id)
        console.log('Delete sub-chapter response:', resp)
      } else {
        console.warn(
          'No id found for sub-chapter, cannot delete from backend:',
          item,
        )
      }
      fetchSections()
      await Swal.fire({
        icon: 'success',
        title: 'Item deleted!',
        showConfirmButton: false,
        timer: 1200,
        customClass: { popup: 'rounded-xl' },
        position: 'center',
      })
    } catch (err) {
      console.log('Delete sub-chapter error:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // Edit judul section (chapter)
  const handleEditSection = (idx) => {
    setEditingSectionIdx(idx)
    setEditSectionTitle(sections[idx].title)
  }
  const handleEditSectionSave = async (idx) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Simpan perubahan judul section ini?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#e11d48',
      cancelButtonColor: '#aaa',
      confirmButtonText: 'Yes',
      customClass: { popup: 'rounded-xl' },
    })
    if (!result.isConfirmed) {
      setEditingSectionIdx(null)
      return
    }
    setLoading(true)
    setError(null)
    try {
      const section = sections[idx]
      await updateChapter(section.id, { title: editSectionTitle })
      fetchSections()
      await Swal.fire({
        icon: 'success',
        title: 'Section title updated!',
        showConfirmButton: false,
        timer: 1200,
        customClass: { popup: 'rounded-xl' },
        position: 'center',
      })
    } catch (err) {
      setError(err.message)
    } finally {
      setEditingSectionIdx(null)
      setLoading(false)
    }
  }

  // Edit judul item
  const handleEditItem = (sectionIdx, itemIdx) => {
    setEditingItem({ sectionIdx, itemIdx })
    setEditItemTitle(sections[sectionIdx].items[itemIdx].title)
  }
  // Ubah handleEditItemSave jadi async
  const handleEditItemSave = async (sectionIdx, itemIdx) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Simpan perubahan judul item ini?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#e11d48',
      cancelButtonColor: '#aaa',
      confirmButtonText: 'Yes',
      customClass: { popup: 'rounded-xl' },
    })
    if (!result.isConfirmed) {
      setEditingItem({ sectionIdx: null, itemIdx: null })
      return
    }
    setSections(
      sections.map((section, idx) => {
        if (idx !== sectionIdx) return section
        return {
          ...section,
          items: section.items.map((item, i) =>
            i === itemIdx ? { ...item, title: editItemTitle } : item,
          ),
        }
      }),
    )
    setEditingItem({ sectionIdx: null, itemIdx: null })
  }

  // Collapse/expand item
  const handleToggleItemExpand = (sectionIdx, itemIdx) => {
    setSections(
      sections.map((section, idx) => {
        if (idx !== sectionIdx) return section
        return {
          ...section,
          items: section.items.map((item, i) =>
            i === itemIdx ? { ...item, expanded: !item.expanded } : item,
          ),
        }
      }),
    )
  }

  // Ganti tipe konten (video/slide) pada lecture
  const handleChangeContentType = (sectionIdx, itemIdx, contentType) => {
    setSections(
      sections.map((section, idx) => {
        if (idx !== sectionIdx) return section
        return {
          ...section,
          items: section.items.map((item, i) =>
            i === itemIdx ? { ...item, contentType } : item,
          ),
        }
      }),
    )
    setShowContentType(null)
  }

  // Drag and drop handler
  const onDragEnd = async (result) => {
    if (!result.destination) return
    // Section drag
    if (result.type === 'section') {
      const newSections = reorder(
        sections,
        result.source.index,
        result.destination.index,
      )
      setSections(newSections)
      // Update order ke BE
      try {
        const orderPayload = newSections.map((section, idx) => ({
          id: section.id,
          order: Number(idx + 1),
        }))
        await updateSubChapterOrder(orderPayload) // Ganti updateChapterOrder dengan updateSubChapterOrder
        fetchSections()
      } catch (err) {
        setError('Gagal update urutan chapter: ' + err.message)
      }
      return
    }
    // Item drag
    const sectionIdx = parseInt(result.type.replace('item-', ''))
    if (
      isNaN(sectionIdx) ||
      !sections[sectionIdx] ||
      !sections[sectionIdx].items
    )
      return
    const items = reorder(
      sections[sectionIdx].items,
      result.source.index,
      result.destination.index,
    )
    setSections(
      sections.map((section, idx) =>
        idx === sectionIdx ? { ...section, items } : section,
      ),
    )
    // Update order ke BE
    try {
      const orderPayload = items.map((item, idx) => ({
        id: item.id,
        order: idx,
      }))
      // updateSubChapterOrder(orderPayload) // Hapus ini
      fetchSections()
    } catch (err) {
      setError('Gagal update urutan sub-chapter: ' + err.message)
    }
  }

  // Icon sesuai tipe
  const getItemIcon = (type, contentType) => {
    if (type === 'lecture') {
      if (contentType === 'slide')
        return <FaRegFileAlt className="text-purple-400 text-lg mr-1" />
      return <FaRegFileAlt className="text-blue-500 text-lg mr-1" />
    }
    if (type === 'quiz')
      return <FaRegCircle className="text-green-500 text-lg mr-1" />
    if (type === 'assignment')
      return <FaRegCircle className="text-yellow-500 text-lg mr-1" />
    return null
  }

  // Tambahkan handler untuk simpan deskripsi
  const handleSaveDescription = (sectionIdx, itemIdx) => {
    setSections(
      sections.map((section, idx) => {
        if (idx !== sectionIdx) return section
        return {
          ...section,
          items: section.items.map((item, i) =>
            i === itemIdx ? { ...item, description: descEdit.value } : item,
          ),
        }
      }),
    )
    setDescEdit({ sectionIdx: null, itemIdx: null, value: '' })
  }
  // Tambah resource ke backend
  const handleAddResource = async (sectionIdx, itemIdx, file) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Tambah resource ke item ini?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#e11d48',
      cancelButtonColor: '#aaa',
      confirmButtonText: 'Yes',
      customClass: { popup: 'rounded-xl' },
    })
    if (!result.isConfirmed) return
    if (!file.name.toLowerCase().endsWith('.pdf')) {
      alert('File harus berformat PDF (.pdf)')
      return
    }
    if (file.size > 10 * 1024 * 1024) {
      alert('Ukuran file maksimal 10 MB')
      return
    }
    setLoading(true)
    setError(null)
    try {
      const item = sections[sectionIdx].items[itemIdx]
      const formData = new FormData()
      formData.append('sub_chapter_id', item.id)
      formData.append('title', file.name || 'Resource')
      formData.append('file_type', 'file')
      formData.append('file_path', file) // file asli
      // Jangan kirim field link jika kosong
      // formData.append('link', '')
      console.log('FormData addResource:', formData)
      const resp = await addResource(formData)
      console.log('Add resource response:', resp)
      fetchSections()
      await Swal.fire({
        icon: 'success',
        title: 'Resource added!',
        showConfirmButton: false,
        timer: 1200,
        customClass: { popup: 'rounded-xl' },
        position: 'center',
      })
    } catch (err) {
      console.log('Add resource error:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }
  // Hapus resource ke backend
  const handleDeleteResource = async (resourceId) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Yakin ingin menghapus resource ini?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#e11d48',
      cancelButtonColor: '#aaa',
      confirmButtonText: 'Yes',
      customClass: { popup: 'rounded-xl' },
    })
    if (!result.isConfirmed) return
    setLoading(true)
    setError(null)
    try {
      await deleteResource(resourceId)
      fetchSections()
      await Swal.fire({
        icon: 'success',
        title: 'Resource deleted!',
        showConfirmButton: false,
        timer: 1200,
        customClass: { popup: 'rounded-xl' },
        position: 'center',
      })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // Handler simpan konten video/slide ke BE
  const handleSaveContent = async (sectionIdx, itemIdx) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Simpan perubahan konten item ini?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#e11d48',
      cancelButtonColor: '#aaa',
      confirmButtonText: 'Yes',
      customClass: { popup: 'rounded-xl' },
    })
    if (!result.isConfirmed) {
      setContentEdit({ sectionIdx: null, itemIdx: null, value: '', file: null })
      return
    }
    setLoading(true)
    setError(null)
    try {
      const item = sections[sectionIdx].items[itemIdx]
      if (!item.id) throw new Error('Item belum tersimpan di backend')
      const formData = new FormData()
      formData.append('_method', 'PUT')
      formData.append('content_type', item.contentType)
      if (item.contentType === 'video') {
        if (!contentEdit.value) throw new Error('Link video wajib diisi')
        formData.append('content_link', contentEdit.value)
      } else if (item.contentType === 'slide') {
        if (!contentEdit.file) throw new Error('File slide wajib diupload')
        formData.append('content_file', contentEdit.file)
      }
      // Tambahkan field lain jika ada
      if (item.description) formData.append('description', item.description)
      if (item.contentText) formData.append('content_text', item.contentText)
      if (item.title) formData.append('content_title', item.title)
      // Debug isi FormData
      for (let pair of formData.entries()) {
        console.log('FormData', pair[0], pair[1])
      }
      const resp = await updateSubChapter(item.id, formData)
      console.log('Update sub-chapter content response:', resp)
      setContentEdit({ sectionIdx: null, itemIdx: null, value: '', file: null })
      fetchSections()
      await Swal.fire({
        icon: 'success',
        title: 'Content updated!',
        showConfirmButton: false,
        timer: 1200,
        customClass: { popup: 'rounded-xl' },
        position: 'center',
      })
    } catch (err) {
      setError(err.message)
      console.log('Update sub-chapter content error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Tab />
      <div className="flex-1 flex flex-col min-h-screen">
        <DashboardHeader />
        <main className="flex-1 w-full max-w-2xl mx-auto px-2 sm:px-4 md:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Curriculum
          </h1>
          {/* Empty state */}
          {sections.length === 0 && (
            <div className="text-center text-gray-400 mb-8">
              No sections yet. Add your first section.
            </div>
          )}
          {loading && (
            <div className="flex justify-center my-4">
              <svg
                className="animate-spin h-6 w-6 text-pink-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                ></path>
              </svg>
            </div>
          )}
          {error && (
            <div className="text-center text-red-500 my-4">{error}</div>
          )}
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="section-droppable" type="section">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {sections.map((section, idx) => (
                    <Draggable
                      key={section.id || `section-${idx}`}
                      draggableId={
                        section.id ? `section-${section.id}` : `section-${idx}`
                      }
                      index={idx}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className={`bg-white rounded-2xl border border-gray-200 p-4 sm:p-6 md:p-8 mb-8 w-full max-w-full transition-all duration-200
        ${snapshot.isDragging ? 'shadow-2xl scale-[1.03] border-pink-400 z-30' : ''}
        ${snapshot.isDropAnimating ? 'ring-2 ring-pink-300' : ''}
        hover:shadow-lg hover:border-pink-300`}
                          style={{
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            ...provided.draggableProps.style,
                          }}
                        >
                          <div className="flex items-center gap-2 mb-4">
                            <span
                              {...provided.dragHandleProps}
                              className="cursor-move"
                            >
                              <FaGripVertical className="text-gray-300 text-xl mr-2" />
                            </span>
                            {editingSectionIdx === idx ? (
                              <input
                                className="font-medium text-lg flex-1 border-b border-pink-200 focus:outline-none focus:border-pink-500 bg-transparent"
                                value={editSectionTitle}
                                onChange={(e) =>
                                  setEditSectionTitle(e.target.value)
                                }
                                onBlur={() => handleEditSectionSave(idx)}
                                onKeyDown={(e) =>
                                  e.key === 'Enter' &&
                                  handleEditSectionSave(idx)
                                }
                                autoFocus
                              />
                            ) : (
                              <span
                                className="font-medium text-lg flex-1 cursor-pointer"
                                onClick={() => handleEditSection(idx)}
                              >
                                {section.title}
                              </span>
                            )}
                            <button
                              className="text-gray-400 hover:text-pink-600 p-1"
                              onClick={() => handleEditSection(idx)}
                              title="Edit"
                            >
                              <FaRegEdit size={15} />
                            </button>
                            <button
                              className="text-gray-400 hover:text-pink-600 p-1"
                              onClick={() => handleDeleteSection(idx)}
                              title="Delete"
                            >
                              <FaTrash size={15} />
                            </button>
                            <button
                              className="ml-2 text-gray-400 hover:text-pink-600 p-1"
                              onClick={() => handleToggleExpand(idx)}
                            >
                              {section.expanded ? (
                                <FaChevronUp size={15} />
                              ) : (
                                <FaChevronDown size={15} />
                              )}
                            </button>
                          </div>
                          {section.expanded && (
                            <Droppable
                              droppableId={
                                section.id
                                  ? `item-droppable-${section.id}`
                                  : `item-droppable-${idx}`
                              }
                              type={
                                section.id
                                  ? `item-${section.id}`
                                  : `item-${idx}`
                              }
                            >
                              {(itemProvided) => (
                                <div
                                  ref={itemProvided.innerRef}
                                  {...itemProvided.droppableProps}
                                >
                                  {idx > 0 && (
                                    <div className="border-t border-gray-100 mb-8"></div>
                                  )}
                                  {section.items.map((item, itemIdx) => (
                                    <Draggable
                                      key={item.id || `item-${itemIdx}`}
                                      draggableId={
                                        item.id
                                          ? `item-${item.id}`
                                          : `item-${itemIdx}`
                                      }
                                      index={itemIdx}
                                    >
                                      {(itemDraggable, itemSnap) => (
                                        <div
                                          ref={itemDraggable.innerRef}
                                          {...itemDraggable.draggableProps}
                                          className={`bg-white rounded-xl border border-gray-200 p-4 sm:p-6 mb-4 w-full flex flex-col relative transition-all duration-200
        ${itemSnap.isDragging ? 'shadow-2xl scale-[1.03] border-pink-400 z-20' : ''}
        ${itemSnap.isDropAnimating ? 'ring-2 ring-pink-300' : ''}
        hover:shadow-md hover:border-pink-200`}
                                          style={
                                            itemDraggable.draggableProps.style
                                          }
                                        >
                                          <div className="flex items-center gap-2 mb-2">
                                            <span
                                              {...itemDraggable.dragHandleProps}
                                              className="cursor-move"
                                            >
                                              <FaGripVertical className="text-gray-300 text-lg mr-1" />
                                            </span>
                                            {getItemIcon(
                                              item.type,
                                              item.contentType,
                                            )}
                                            {editingItem.sectionIdx === idx &&
                                            editingItem.itemIdx === itemIdx ? (
                                              <input
                                                className="font-medium text-base text-blue-900 border-b border-pink-200 focus:outline-none focus:border-pink-500 bg-transparent"
                                                value={editItemTitle}
                                                onChange={(e) =>
                                                  setEditItemTitle(
                                                    e.target.value,
                                                  )
                                                }
                                                onBlur={() =>
                                                  handleEditItemSave(
                                                    idx,
                                                    itemIdx,
                                                  )
                                                }
                                                onKeyDown={(e) =>
                                                  e.key === 'Enter' &&
                                                  handleEditItemSave(
                                                    idx,
                                                    itemIdx,
                                                  )
                                                }
                                                autoFocus
                                              />
                                            ) : (
                                              <span
                                                className="font-medium text-base text-blue-900 cursor-pointer"
                                                onClick={() =>
                                                  handleEditItem(idx, itemIdx)
                                                }
                                              >
                                                {item.title}
                                              </span>
                                            )}
                                            <div className="flex-1" />
                                            <span className="bg-pink-100 text-pink-600 px-2 py-0.5 rounded-full text-xs font-bold mr-1">
                                              Free
                                            </span>
                                            {/* Dropdown Content Type */}
                                            {item.type === 'lecture' && (
                                              <div className="relative">
                                                <button
                                                  className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full text-xs font-bold border mr-1 flex items-center gap-1"
                                                  onClick={() =>
                                                    setShowContentType(
                                                      showContentType ===
                                                        `${idx}-${itemIdx}`
                                                        ? null
                                                        : `${idx}-${itemIdx}`,
                                                    )
                                                  }
                                                  type="button"
                                                >
                                                  Content{' '}
                                                  <FaChevronDown className="inline ml-1 text-xs" />
                                                </button>
                                                {showContentType ===
                                                  `${idx}-${itemIdx}` && (
                                                  <div className="absolute right-0 top-8 bg-white border rounded-xl shadow-lg p-4 z-10 w-48">
                                                    <div className="font-semibold text-gray-500 mb-2 text-sm">
                                                      Pilih tipe konten
                                                    </div>
                                                    <button
                                                      className="flex items-center gap-2 w-full px-3 py-2 rounded-lg hover:bg-gray-50 text-blue-700 font-semibold"
                                                      onClick={() =>
                                                        handleChangeContentType(
                                                          idx,
                                                          itemIdx,
                                                          'video',
                                                        )
                                                      }
                                                    >
                                                      <FaRegFileAlt className="text-blue-500" />{' '}
                                                      Video
                                                    </button>
                                                    <button
                                                      className="flex items-center gap-2 w-full px-3 py-2 rounded-lg hover:bg-gray-50 text-purple-600 font-semibold"
                                                      onClick={() =>
                                                        handleChangeContentType(
                                                          idx,
                                                          itemIdx,
                                                          'slide',
                                                        )
                                                      }
                                                    >
                                                      <FaRegFileAlt className="text-purple-400" />{' '}
                                                      Slide
                                                    </button>
                                                  </div>
                                                )}
                                              </div>
                                            )}
                                            <button
                                              className="text-gray-400 hover:text-pink-600 p-1"
                                              onClick={() =>
                                                handleEditItem(idx, itemIdx)
                                              }
                                              title="Edit"
                                            >
                                              <FaRegEdit size={15} />
                                            </button>
                                            <button
                                              className="text-gray-400 hover:text-pink-600 p-1"
                                              onClick={() =>
                                                handleDeleteItem(idx, itemIdx)
                                              }
                                              title="Delete"
                                            >
                                              <FaTrash size={15} />
                                            </button>
                                            <button
                                              className="text-gray-400 hover:text-pink-600 p-1"
                                              onClick={() =>
                                                handleToggleItemExpand(
                                                  idx,
                                                  itemIdx,
                                                )
                                              }
                                            >
                                              {item.expanded ? (
                                                <FaChevronUp size={15} />
                                              ) : (
                                                <FaChevronDown size={15} />
                                              )}
                                            </button>
                                          </div>
                                          {item.expanded && (
                                            <>
                                              {/* Konten Video/Slide */}
                                              {item.contentType === 'video' && (
                                                <div className="mb-2">
                                                  <span className="font-semibold">
                                                    Video URL
                                                  </span>
                                                  {contentEdit.sectionIdx ===
                                                    idx &&
                                                  contentEdit.itemIdx ===
                                                    itemIdx ? (
                                                    <div className="flex gap-2 mt-1">
                                                      <input
                                                        className="border rounded-lg px-3 py-2 w-full"
                                                        type="text"
                                                        placeholder="Masukkan link video (YouTube, Vimeo, dll)"
                                                        value={
                                                          contentEdit.value
                                                        }
                                                        onChange={(e) =>
                                                          setContentEdit({
                                                            ...contentEdit,
                                                            value:
                                                              e.target.value,
                                                          })
                                                        }
                                                        autoFocus
                                                      />
                                                      <button
                                                        className="bg-pink-600 hover:bg-pink-700 text-white font-semibold px-4 py-1 rounded-lg"
                                                        onClick={() =>
                                                          handleSaveContent(
                                                            idx,
                                                            itemIdx,
                                                          )
                                                        }
                                                        type="button"
                                                      >
                                                        Simpan
                                                      </button>
                                                      <button
                                                        className="text-gray-500 px-3 py-1"
                                                        onClick={() =>
                                                          setContentEdit({
                                                            sectionIdx: null,
                                                            itemIdx: null,
                                                            value: '',
                                                            file: null,
                                                          })
                                                        }
                                                        type="button"
                                                      >
                                                        Batal
                                                      </button>
                                                    </div>
                                                  ) : item.content_link ? (
                                                    <>
                                                      <div
                                                        className="text-blue-700 underline cursor-pointer mt-1 mb-1"
                                                        onClick={() =>
                                                          window.open(
                                                            item.content_link,
                                                            '_blank',
                                                          )
                                                        }
                                                      >
                                                        {item.content_link}
                                                      </div>
                                                      <button
                                                        className="flex items-center gap-2 text-base font-semibold text-gray-500 hover:text-pink-600 mt-1"
                                                        onClick={() =>
                                                          setContentEdit({
                                                            sectionIdx: idx,
                                                            itemIdx,
                                                            value:
                                                              item.content_link,
                                                            file: null,
                                                          })
                                                        }
                                                        type="button"
                                                      >
                                                        Edit Link Video
                                                      </button>
                                                      {/* Preview video: jika YouTube tampilkan thumbnail, jika bukan tetap iframe */}
                                                      <div className="mt-2">
                                                        {getYouTubeThumbnail(
                                                          item.content_link,
                                                        ) ? (
                                                          <a
                                                            href={
                                                              item.content_link
                                                            }
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="block w-full max-w-xs mx-auto"
                                                          >
                                                            <img
                                                              src={getYouTubeThumbnail(
                                                                item.content_link,
                                                              )}
                                                              alt="YouTube Thumbnail"
                                                              className="rounded-lg border w-full object-cover"
                                                              style={{
                                                                aspectRatio:
                                                                  '16/9',
                                                              }}
                                                            />
                                                            <div className="text-center text-xs text-gray-500 mt-1">
                                                              Klik untuk buka
                                                              video
                                                            </div>
                                                          </a>
                                                        ) : (
                                                          <iframe
                                                            src={
                                                              item.content_link
                                                            }
                                                            title="Video Preview"
                                                            className="w-full h-56 rounded-lg border"
                                                            allowFullScreen
                                                          />
                                                        )}
                                                      </div>
                                                    </>
                                                  ) : (
                                                    <button
                                                      className="flex items-center gap-2 text-base font-semibold text-gray-500 hover:text-pink-600 mt-1"
                                                      onClick={() =>
                                                        setContentEdit({
                                                          sectionIdx: idx,
                                                          itemIdx,
                                                          value: '',
                                                          file: null,
                                                        })
                                                      }
                                                      type="button"
                                                    >
                                                      <FaPlus className="text-gray-400" />{' '}
                                                      Tambah Link Video
                                                    </button>
                                                  )}
                                                </div>
                                              )}
                                              {item.contentType === 'slide' && (
                                                <div className="mb-2">
                                                  <span className="font-semibold">
                                                    Upload Slide (PDF)
                                                  </span>
                                                  {contentEdit.sectionIdx ===
                                                    idx &&
                                                  contentEdit.itemIdx ===
                                                    itemIdx ? (
                                                    <div className="flex gap-2 mt-1 items-center">
                                                      <input
                                                        className="border rounded-lg px-3 py-2 w-full"
                                                        type="file"
                                                        accept="application/pdf"
                                                        onChange={(e) =>
                                                          setContentEdit({
                                                            ...contentEdit,
                                                            file: e.target
                                                              .files[0],
                                                          })
                                                        }
                                                      />
                                                      <button
                                                        className="bg-pink-600 hover:bg-pink-700 text-white font-semibold px-4 py-1 rounded-lg"
                                                        onClick={() =>
                                                          handleSaveContent(
                                                            idx,
                                                            itemIdx,
                                                          )
                                                        }
                                                        type="button"
                                                      >
                                                        Simpan
                                                      </button>
                                                      <button
                                                        className="text-gray-500 px-3 py-1"
                                                        onClick={() =>
                                                          setContentEdit({
                                                            sectionIdx: null,
                                                            itemIdx: null,
                                                            value: '',
                                                            file: null,
                                                          })
                                                        }
                                                        type="button"
                                                      >
                                                        Batal
                                                      </button>
                                                    </div>
                                                  ) : item.content_file ? (
                                                    <div className="flex flex-col gap-1 mt-2">
                                                      <div className="flex items-center gap-2">
                                                        <FaRegFileAlt className="text-purple-700 text-lg" />
                                                        <span className="font-semibold text-purple-800 text-sm truncate max-w-[160px] md:max-w-[240px] lg:max-w-[320px]">
                                                          {item.content_file
                                                            .split('/')
                                                            .pop()}
                                                        </span>
                                                        <button
                                                          className="ml-2 text-xs text-blue-600 underline hover:text-blue-800"
                                                          onClick={() =>
                                                            window.open(
                                                              item.content_file,
                                                              '_blank',
                                                            )
                                                          }
                                                          type="button"
                                                        >
                                                          Preview Slide
                                                        </button>
                                                        <button
                                                          className="ml-2 text-xs text-gray-500 hover:text-pink-600"
                                                          onClick={() =>
                                                            setContentEdit({
                                                              sectionIdx: idx,
                                                              itemIdx,
                                                              value: '',
                                                              file: null,
                                                            })
                                                          }
                                                          type="button"
                                                        >
                                                          Ganti File Slide
                                                        </button>
                                                      </div>
                                                      {/* Responsive PDF preview (modal/iframe) bisa ditambahkan di sini jika ingin lebih advance */}
                                                    </div>
                                                  ) : (
                                                    <button
                                                      className="flex items-center gap-2 text-base font-semibold text-gray-500 hover:text-pink-600 mt-1"
                                                      onClick={() =>
                                                        setContentEdit({
                                                          sectionIdx: idx,
                                                          itemIdx,
                                                          value: '',
                                                          file: null,
                                                        })
                                                      }
                                                      type="button"
                                                    >
                                                      <FaPlus className="text-gray-400" />{' '}
                                                      Upload Slide PDF
                                                    </button>
                                                  )}
                                                </div>
                                              )}
                                              <div className="mb-2">
                                                <span className="font-semibold">
                                                  Description
                                                </span>
                                                {descEdit.sectionIdx === idx &&
                                                descEdit.itemIdx === itemIdx ? (
                                                  <div className="flex flex-col gap-2 mt-1">
                                                    <textarea
                                                      className="border rounded-lg px-3 py-2 w-full"
                                                      value={descEdit.value}
                                                      onChange={(e) =>
                                                        setDescEdit({
                                                          ...descEdit,
                                                          value: e.target.value,
                                                        })
                                                      }
                                                      rows={2}
                                                      autoFocus
                                                    />
                                                    <div className="flex gap-2">
                                                      <button
                                                        className="bg-pink-600 hover:bg-pink-700 text-white font-semibold px-4 py-1 rounded-lg"
                                                        onClick={() =>
                                                          handleSaveDescription(
                                                            idx,
                                                            itemIdx,
                                                          )
                                                        }
                                                        type="button"
                                                      >
                                                        Save
                                                      </button>
                                                      <button
                                                        className="text-gray-500 px-3 py-1"
                                                        onClick={() =>
                                                          setDescEdit({
                                                            sectionIdx: null,
                                                            itemIdx: null,
                                                            value: '',
                                                          })
                                                        }
                                                        type="button"
                                                      >
                                                        Cancel
                                                      </button>
                                                    </div>
                                                  </div>
                                                ) : item.description ? (
                                                  <>
                                                    <div className="text-gray-700 text-base mt-1 mb-1">
                                                      {item.description}
                                                    </div>
                                                    <button
                                                      className="flex items-center gap-2 text-base font-semibold text-gray-500 hover:text-pink-600 mt-1"
                                                      onClick={() =>
                                                        setDescEdit({
                                                          sectionIdx: idx,
                                                          itemIdx,
                                                          value:
                                                            item.description,
                                                        })
                                                      }
                                                      type="button"
                                                    >
                                                      <FaPlus className="text-gray-400" />{' '}
                                                      Edit Description
                                                    </button>
                                                  </>
                                                ) : (
                                                  <button
                                                    className="flex items-center gap-2 text-base font-semibold text-gray-500 hover:text-pink-600 mt-1"
                                                    onClick={() =>
                                                      setDescEdit({
                                                        sectionIdx: idx,
                                                        itemIdx,
                                                        value: '',
                                                      })
                                                    }
                                                    type="button"
                                                  >
                                                    <FaPlus className="text-gray-400" />{' '}
                                                    Add Description
                                                  </button>
                                                )}
                                              </div>
                                              <div className="mb-2">
                                                <span className="font-semibold">
                                                  Resources
                                                </span>
                                                {item.resources &&
                                                item.resources.length > 0 ? (
                                                  <ul className="text-gray-700 text-sm mb-1 mt-1">
                                                    {item.resources.map(
                                                      (res, i) => (
                                                        <li
                                                          key={res.id || i}
                                                          className="mb-1 flex items-center gap-2"
                                                        >
                                                          {res.title ||
                                                            res.file_path ||
                                                            'Resource'}
                                                          {res.file_path && (
                                                            <a
                                                              href={
                                                                typeof res.file_path ===
                                                                'string'
                                                                  ? res.file_path
                                                                  : undefined
                                                              }
                                                              download={
                                                                res.title ||
                                                                'Resource'
                                                              }
                                                              className="text-blue-500 underline text-xs ml-2"
                                                              target="_blank"
                                                              rel="noopener noreferrer"
                                                            >
                                                              Download
                                                            </a>
                                                          )}
                                                          {res.id && (
                                                            <button
                                                              className="text-red-500 hover:text-red-700 text-xs ml-2"
                                                              onClick={() =>
                                                                handleDeleteResource(
                                                                  res.id,
                                                                )
                                                              }
                                                              title="Delete Resource"
                                                            >
                                                              <FaTrash
                                                                size={12}
                                                              />
                                                            </button>
                                                          )}
                                                        </li>
                                                      ),
                                                    )}
                                                  </ul>
                                                ) : (
                                                  <div className="text-gray-400 text-xs mb-1">
                                                    No resources yet.
                                                  </div>
                                                )}
                                                {resourceEdit.sectionIdx ===
                                                  idx &&
                                                resourceEdit.itemIdx ===
                                                  itemIdx ? (
                                                  <input
                                                    type="file"
                                                    className="block mt-1"
                                                    accept="*/*"
                                                    onChange={(e) => {
                                                      console.log(
                                                        'onChange file dipanggil',
                                                        e.target.files,
                                                      )
                                                      if (
                                                        e.target.files &&
                                                        e.target.files[0]
                                                      )
                                                        handleAddResource(
                                                          idx,
                                                          itemIdx,
                                                          e.target.files[0],
                                                        )
                                                    }}
                                                    onBlur={() =>
                                                      setResourceEdit({
                                                        sectionIdx: null,
                                                        itemIdx: null,
                                                      })
                                                    }
                                                    autoFocus
                                                  />
                                                ) : (
                                                  <button
                                                    className="flex items-center gap-2 text-base font-semibold text-gray-500 hover:text-pink-600 mt-1"
                                                    onClick={() => {
                                                      console.log(
                                                        'Klik Add External Resource',
                                                        idx,
                                                        itemIdx,
                                                      )
                                                      setResourceEdit({
                                                        sectionIdx: idx,
                                                        itemIdx,
                                                      })
                                                    }}
                                                    type="button"
                                                  >
                                                    <FaPlus className="text-gray-400" />{' '}
                                                    {item.resources &&
                                                    item.resources.length > 0
                                                      ? 'Add Another Resource'
                                                      : 'Add External Resource'}
                                                  </button>
                                                )}
                                              </div>
                                            </>
                                          )}
                                          {/* Tampilkan subSubs jika ada */}
                                          {item.subSubs &&
                                            item.subSubs.length > 0 && (
                                              <div className="mt-1 ml-6">
                                                <div className="font-semibold text-xs text-pink-600 mb-1">
                                                  Sub Sub Chapters:
                                                </div>
                                                <ul className="list-disc ml-4">
                                                  {item.subSubs.map(
                                                    (subsub, sidx) => (
                                                      <li
                                                        key={subsub.id || sidx}
                                                        className="text-gray-700 text-xs"
                                                      >
                                                        <span className="font-medium">
                                                          {subsub.title ||
                                                            `Sub Sub ${sidx + 1}`}
                                                        </span>
                                                        {subsub.content_link && (
                                                          <>
                                                            {': '}
                                                            <a
                                                              href={
                                                                subsub.content_link
                                                              }
                                                              target="_blank"
                                                              rel="noopener noreferrer"
                                                              className="text-blue-600 underline ml-1"
                                                            >
                                                              {
                                                                subsub.content_link
                                                              }
                                                            </a>
                                                          </>
                                                        )}
                                                      </li>
                                                    ),
                                                  )}
                                                </ul>
                                              </div>
                                            )}
                                        </div>
                                      )}
                                    </Draggable>
                                  ))}
                                  {/* Form Add New Item di bawah semua items, hanya satu kali per section */}
                                  <div className="mb-4">
                                    <span className="font-semibold text-gray-700">
                                      Add New Item:
                                    </span>
                                    <div className="flex gap-2 mt-2">
                                      <button
                                        className="flex-1 border border-gray-300 rounded-lg px-4 py-2 flex items-center justify-center gap-2 bg-white font-semibold hover:bg-blue-50 text-blue-700 transition hover:scale-105 shadow-sm"
                                        onClick={() =>
                                          handleAddItem(idx, 'lecture')
                                        }
                                        type="button"
                                      >
                                        <FaRegFileAlt className="text-blue-500" />{' '}
                                        LECTURE
                                      </button>
                                      <button
                                        className="flex-1 border border-gray-300 rounded-lg px-4 py-2 flex items-center justify-center gap-2 bg-white font-semibold hover:bg-green-50 text-green-700 transition hover:scale-105 shadow-sm"
                                        onClick={() =>
                                          handleAddItem(idx, 'quiz')
                                        }
                                        type="button"
                                      >
                                        <FaRegCircle className="text-green-500" />{' '}
                                        QUIZ
                                      </button>
                                      <button
                                        className="flex-1 border border-gray-300 rounded-lg px-4 py-2 flex items-center justify-center gap-2 bg-white font-semibold hover:bg-yellow-50 text-yellow-700 transition hover:scale-105 shadow-sm"
                                        onClick={() =>
                                          handleAddItem(idx, 'assignment')
                                        }
                                        type="button"
                                      >
                                        <FaRegCircle className="text-yellow-500" />{' '}
                                        ASSIGNMENT
                                      </button>
                                    </div>
                                  </div>
                                  {itemProvided.placeholder}
                                </div>
                              )}
                            </Droppable>
                          )}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          {/* Add Section selalu di bawah */}
          <form
            onSubmit={handleAddSection}
            className="bg-white rounded-2xl border border-gray-200 p-6 flex items-center gap-2 mt-8 w-full sticky bottom-0 z-10 shadow-lg"
          >
            <input
              type="text"
              className="flex-1 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-pink-200"
              placeholder="Add a new section..."
              value={newSection}
              onChange={(e) => setNewSection(e.target.value)}
            />
            <button
              type="submit"
              className="bg-pink-600 hover:bg-pink-700 text-white font-semibold px-8 py-2 rounded-lg shadow"
            >
              Add Section
            </button>
          </form>
        </main>
      </div>
    </div>
  )
}

export default Curriculum
