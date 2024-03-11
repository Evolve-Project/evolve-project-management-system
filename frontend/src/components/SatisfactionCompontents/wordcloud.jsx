// frontend/src/components/WordCloud.js
import React, { useEffect, useRef } from 'react';
import axios from 'axios';
import * as d3 from 'd3';
import cloud from 'd3-cloud';

const WordCloud = ({ teamId }) => {
    const svgRef = useRef();

    useEffect(() => {
        axios.post('localhost:8000/feedbackWords', { teamId })
            .then(res => {
                const words = res.data;

                const svg = d3.select(svgRef.current);
                const layout = cloud()
                    .size([500, 500])
                    .words(words)
                    .padding(5)
                    .rotate(() => ~~(Math.random() * 2) * 90)
                    .fontSize(d => d.size)
                    .on("end", draw);

                layout.start();

                function draw(words) {
                    svg
                        .attr("width", layout.size()[0])
                        .attr("height", layout.size()[1])
                        .append("g")
                        .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
                        .selectAll("text")
                        .data(words)
                        .enter().append("text")
                        .style("font-size", d => d.size + "px")
                        .style("font-family", "Impact")
                        .attr("text-anchor", "middle")
                        .attr("transform", d => "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")")
                        .text(d => d.word);
                }
            })
            .catch(err => console.error(err));
    }, [teamId]);

    return <svg ref={svgRef}></svg>;
};

export default WordCloud;