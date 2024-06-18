'use client';
import React, { useRef, useState, useEffect } from 'react';
import { Chart } from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';
import { addNote, deleteNote } from '../../api';
import { v4 } from 'uuid';
import { useRouter } from 'next/navigation';

Chart.register(annotationPlugin);

const MyChart = ({ notes }) => {
  const chartRef = useRef(null);

  const [noteText, setNoteText] = useState('');
  const [xValue, setXValue] = useState('');
  const [yValue, setYValue] = useState('');

  const router = useRouter();

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    const myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
        ],
        datasets: [
          {
            label: 'My First Dataset',
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
          },
        ],
      },
      options: {
        plugins: {
          annotation: {
            annotations: notes.map(ann => ({
              id: ann.id,
              type: 'label',
              xValue: ann.xValue,
              yValue: ann.yValue,
              backgroundColor: 'rgba(0,0,0,0.8)',
              borderColor: 'rgba(0,0,0,1)',
              borderWidth: 1,
              xPadding: 6,
              yPadding: 6,
              cornerRadius: 6,
              content: ann.text,
              font: {
                size: 12,
              },
              color: 'white',
              position: 'center',
            })),
          },
        },
      },
    });

    return () => {
      myChart.destroy();
    };
  }, [notes]);


  const handleSubmitNote = async e => {
    e.preventDefault();
    await addNote({
      id: v4(),
      text: noteText,
      xValue: xValue,
      yValue: yValue,
    });
    setNoteText('');
    setXValue('');
    setYValue('');
    router.refresh();
  };

  const handleDeleteNote = async id => {    
    await deleteNote(id);
    router.refresh();
  };

  return (
    <div className='w-full  flex flex-col justify-center items-center'>
    <div className='w-1/2'>
      <canvas ref={chartRef}></canvas></div>
      <div className=' border border-slate-400 rounded p-4 my-4'>
      <form className= 'flex flex-col gap-4' onSubmit={handleSubmitNote}>
        <input
          type="text"
          placeholder="Note Text"
          value={noteText}
          onChange={e => setNoteText(e.target.value)}
        />
        <input
          type="text"
          placeholder="X Value"
          value={xValue}
          onChange={e => setXValue(e.target.value)}
        />
        <input
          type="text"
          placeholder="Y Value"
          value={yValue}
          onChange={e => setYValue(e.target.value)}
        />
        <button
          className="border border-black rounded py-1 my-2 hover:bg-black hover:text-white w-24"
          type="submit"
        >
          Add Note
        </button>
      </form>
      </div>
      <div className='border border-slate-400 rounded p-4'>
        {notes.map(note => (
          <div key={note.id}>
            <span>
              {note.text} (X: {note.xValue}, Y: {note.yValue})
            </span>
            <button
              className="border border-black rounded p-1 m-2 hover:bg-black hover:text-white"
              onClick={() => handleDeleteNote(note.id)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyChart;
