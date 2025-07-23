import React, { useState } from 'react'
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

  // Add Section
  const handleAddSection = (e) => {
    e.preventDefault()
    if (!newSection.trim()) return
    setSections([
      ...sections,
      { ...initialSection, title: newSection, expanded: true, items: [] },
    ])
    setNewSection('')
    setTimeout(() => {
      setAddItemSectionIdx(sections.length) // index section baru
    }, 0)
  }

  // Expand/collapse section
  const handleToggleExpand = (idx) => {
    setSections(
      sections.map((s, i) => (i === idx ? { ...s, expanded: !s.expanded } : s)),
    )
  }

  // Add new item to section
  const handleAddItem = (sectionIdx, type) => {
    setSections(
      sections.map((section, idx) => {
        if (idx !== sectionIdx) return section
        let iconTitle = 'New Lecture',
          contentType = 'video'
        if (type === 'quiz') {
          iconTitle = 'New Quiz'
          contentType = undefined
        }
        if (type === 'assignment') {
          iconTitle = 'New Assignment'
          contentType = undefined
        }
        return {
          ...section,
          items: [
            ...section.items,
            {
              type,
              contentType,
              title: iconTitle,
              preview: '',
              description: '',
              resources: [],
              expanded: true,
              editing: false,
            },
          ],
        }
      }),
    )
  }

  // Hapus section
  const handleDeleteSection = (idx) => {
    setSections(sections.filter((_, i) => i !== idx))
  }

  // Hapus item
  const handleDeleteItem = (sectionIdx, itemIdx) => {
    setSections(
      sections.map((section, idx) => {
        if (idx !== sectionIdx) return section
        return {
          ...section,
          items: section.items.filter((_, i) => i !== itemIdx),
        }
      }),
    )
  }

  // Edit judul section
  const handleEditSection = (idx) => {
    setEditingSectionIdx(idx)
    setEditSectionTitle(sections[idx].title)
  }
  const handleEditSectionSave = (idx) => {
    setSections(
      sections.map((section, i) =>
        i === idx ? { ...section, title: editSectionTitle } : section,
      ),
    )
    setEditingSectionIdx(null)
  }

  // Edit judul item
  const handleEditItem = (sectionIdx, itemIdx) => {
    setEditingItem({ sectionIdx, itemIdx })
    setEditItemTitle(sections[sectionIdx].items[itemIdx].title)
  }
  const handleEditItemSave = (sectionIdx, itemIdx) => {
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
  const onDragEnd = (result) => {
    if (!result.destination) return
    // Section drag
    if (result.type === 'section') {
      setSections(
        reorder(sections, result.source.index, result.destination.index),
      )
      return
    }
    // Item drag
    const sectionIdx = parseInt(result.type.replace('item-', ''))
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
  // Tambahkan handler untuk simpan resource
  const handleAddResource = (sectionIdx, itemIdx, file) => {
    setSections(
      sections.map((section, idx) => {
        if (idx !== sectionIdx) return section
        return {
          ...section,
          items: section.items.map((item, i) =>
            i === itemIdx
              ? { ...item, resources: [...(item.resources || []), file] }
              : item,
          ),
        }
      }),
    )
    setResourceEdit({ sectionIdx: null, itemIdx: null })
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Tab />
      <div className="flex-1 flex flex-col min-h-screen">
        <DashboardHeader />
        <main className="flex-1 max-w-4xl ml-8 md:ml-16 lg:ml-32 px-4 md:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Curriculum</h1>
          {/* Empty state */}
          {sections.length === 0 && (
            <div className="text-center text-gray-400 mb-8">
              No sections yet. Add your first section.
            </div>
          )}
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="section-droppable" type="section">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {sections.map((section, idx) => (
                    <Draggable
                      key={idx}
                      draggableId={`section-${idx}`}
                      index={idx}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className={`bg-white rounded-2xl border border-gray-200 p-8 mb-8 w-full transition hover:shadow-md ${snapshot.isDragging ? 'shadow-lg border-pink-200' : ''}`}
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
                            >
                              <FaRegEdit size={15} />
                            </button>
                            <button
                              className="text-gray-400 hover:text-pink-600 p-1"
                              onClick={() => handleDeleteSection(idx)}
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
                          {/* Jika section belum punya item, tampilkan pilihan add item pertama */}
                          {section.items.length === 0 &&
                            addItemSectionIdx === idx && (
                              <div className="flex flex-col gap-2 mt-2">
                                <div className="font-semibold mb-2">
                                  Add First Item:
                                </div>
                                <div className="flex gap-2">
                                  <button
                                    className={`flex-1 border border-gray-300 rounded-lg px-4 py-2 flex items-center justify-center gap-2 bg-white font-semibold hover:bg-blue-50 ${firstItemType === 'lecture' ? 'text-blue-700' : 'text-gray-700'}`}
                                    onClick={() => setFirstItemType('lecture')}
                                    type="button"
                                  >
                                    <FaRegFileAlt className="text-blue-500" />{' '}
                                    LECTURE
                                  </button>
                                  <button
                                    className={`flex-1 border border-gray-300 rounded-lg px-4 py-2 flex items-center justify-center gap-2 bg-white font-semibold hover:bg-green-50 ${firstItemType === 'quiz' ? 'text-green-700' : 'text-gray-700'}`}
                                    onClick={() => setFirstItemType('quiz')}
                                    type="button"
                                  >
                                    <FaRegCircle className="text-green-500" />{' '}
                                    QUIZ
                                  </button>
                                  <button
                                    className={`flex-1 border border-gray-300 rounded-lg px-4 py-2 flex items-center justify-center gap-2 bg-white font-semibold hover:bg-yellow-50 ${firstItemType === 'assignment' ? 'text-yellow-700' : 'text-gray-700'}`}
                                    onClick={() =>
                                      setFirstItemType('assignment')
                                    }
                                    type="button"
                                  >
                                    <FaRegCircle className="text-yellow-500" />{' '}
                                    ASSIGNMENT
                                  </button>
                                  <button
                                    className="ml-2 bg-pink-600 hover:bg-pink-700 text-white font-semibold px-4 py-2 rounded-lg shadow"
                                    type="button"
                                    onClick={() => {
                                      handleAddItem(idx, firstItemType)
                                      setAddItemSectionIdx(null)
                                    }}
                                  >
                                    Add
                                  </button>
                                </div>
                              </div>
                            )}
                          {section.expanded && (
                            <Droppable
                              droppableId={`item-droppable-${idx}`}
                              type={`item-${idx}`}
                            >
                              {(itemProvided) => (
                                <div
                                  ref={itemProvided.innerRef}
                                  {...itemProvided.droppableProps}
                                >
                                  {section.items.map((item, itemIdx) => (
                                    <Draggable
                                      key={itemIdx}
                                      draggableId={`item-${idx}-${itemIdx}`}
                                      index={itemIdx}
                                    >
                                      {(itemDraggable, itemSnap) => (
                                        <div
                                          ref={itemDraggable.innerRef}
                                          {...itemDraggable.draggableProps}
                                          className={`bg-white rounded-xl border border-gray-200 p-6 mb-4 w-full flex flex-col relative transition hover:shadow-sm ${itemSnap.isDragging ? 'shadow-lg border-pink-200' : ''}`}
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
                                            >
                                              <FaRegEdit size={15} />
                                            </button>
                                            <button
                                              className="text-gray-400 hover:text-pink-600 p-1"
                                              onClick={() =>
                                                handleDeleteItem(idx, itemIdx)
                                              }
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
                                              <div className="mb-2">
                                                <span className="font-semibold">
                                                  Preview
                                                </span>
                                                <div className="text-gray-400 text-xs">
                                                  No video or slide added yet.
                                                </div>
                                              </div>
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
                                                          key={i}
                                                          className="mb-1 flex items-center gap-2"
                                                        >
                                                          {res.name || res}
                                                          {res instanceof
                                                            File && (
                                                            <a
                                                              href={URL.createObjectURL(
                                                                res,
                                                              )}
                                                              download={
                                                                res.name
                                                              }
                                                              className="text-blue-500 underline text-xs ml-2"
                                                              target="_blank"
                                                              rel="noopener noreferrer"
                                                            >
                                                              Download
                                                            </a>
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
                                                    onClick={() =>
                                                      setResourceEdit({
                                                        sectionIdx: idx,
                                                        itemIdx,
                                                      })
                                                    }
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
                                        </div>
                                      )}
                                    </Draggable>
                                  ))}
                                  {itemProvided.placeholder}
                                </div>
                              )}
                            </Droppable>
                          )}
                          {/* Add New Item hanya jika sudah ada item */}
                          {section.items.length > 0 && (
                            <div className="flex flex-col gap-2 mt-2">
                              <div className="font-semibold mb-2">
                                Add New Item:
                              </div>
                              <div className="flex gap-2">
                                <button
                                  className={`flex-1 border border-gray-300 rounded-lg px-4 py-2 flex items-center justify-center gap-2 bg-white font-semibold hover:bg-blue-50 ${addType === 'lecture' ? 'text-blue-700' : 'text-gray-700'}`}
                                  onClick={() => setAddType('lecture')}
                                  type="button"
                                >
                                  <FaRegFileAlt className="text-blue-500" />{' '}
                                  LECTURE
                                </button>
                                <button
                                  className={`flex-1 border border-gray-300 rounded-lg px-4 py-2 flex items-center justify-center gap-2 bg-white font-semibold hover:bg-green-50 ${addType === 'quiz' ? 'text-green-700' : 'text-gray-700'}`}
                                  onClick={() => setAddType('quiz')}
                                  type="button"
                                >
                                  <FaRegCircle className="text-green-500" />{' '}
                                  QUIZ
                                </button>
                                <button
                                  className={`flex-1 border border-gray-300 rounded-lg px-4 py-2 flex items-center justify-center gap-2 bg-white font-semibold hover:bg-yellow-50 ${addType === 'assignment' ? 'text-yellow-700' : 'text-gray-700'}`}
                                  onClick={() => setAddType('assignment')}
                                  type="button"
                                >
                                  <FaRegCircle className="text-yellow-500" />{' '}
                                  ASSIGNMENT
                                </button>
                                <button
                                  className="ml-2 bg-pink-600 hover:bg-pink-700 text-white font-semibold px-4 py-2 rounded-lg shadow"
                                  type="button"
                                  onClick={() => handleAddItem(idx, addType)}
                                >
                                  Add
                                </button>
                              </div>
                            </div>
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
            className="bg-white rounded-2xl border border-gray-200 p-6 flex items-center gap-2 mt-8 w-full"
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
