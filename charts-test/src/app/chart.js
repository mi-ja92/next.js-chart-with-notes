'use client'
import React, { useRef, useState, useEffect } from 'react';
import { Chart } from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';

Chart.register(annotationPlugin);

const MyChart = () => {
  const chartRef = useRef(null);
  const [annotations, setAnnotations] = useState([]);
  const [noteText, setNoteText] = useState('');
  const [xValue, setXValue] = useState('');
  const [yValue, setYValue] = useState('');

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    const myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
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
            annotations: annotations.map((ann) => ({
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
  }, [annotations]);

  const addAnnotation = () => {
    const newAnnotation = {
      id: Date.now(),
      text: noteText,
      xValue: xValue,
      yValue: parseInt(yValue),
    };

    setAnnotations((prevAnnotations) => [...prevAnnotations, newAnnotation]);
    setNoteText('');
    setXValue('');
    setYValue('');
  };

  const removeAnnotation = (id) => {
    setAnnotations((prevAnnotations) => prevAnnotations.filter((ann) => ann.id !== id));
  };

  return (
    <div>
      <canvas ref={chartRef}></canvas>
      <input
        type="text"
        placeholder="Note Text"
        value={noteText}
        onChange={(e) => setNoteText(e.target.value)}
      />
      <input
        type="text"
        placeholder="X Value"
        value={xValue}
        onChange={(e) => setXValue(e.target.value)}
      />
      <input
        type="text"
        placeholder="Y Value"
        value={yValue}
        onChange={(e) => setYValue(e.target.value)}
      />
      <button className='border border-black rounded p-1 m-2 hover:bg-black hover:text-white'  onClick={addAnnotation}>Add Note</button>
      <div>
        {annotations.map((ann) => (
          <div key={ann.id}>
            <span>
              {ann.text} (X: {ann.xValue}, Y: {ann.yValue})
            </span>
            <button className='border border-black rounded p-1 m-2 hover:bg-black hover:text-white'  onClick={() => removeAnnotation(ann.id)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyChart;



