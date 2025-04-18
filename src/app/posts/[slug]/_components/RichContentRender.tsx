'use client';

import React, { useEffect, useState } from 'react';
import parse, {
  DOMNode,
  HTMLReactParserOptions,
  Element,
} from 'html-react-parser';
import ReactPlayer from 'react-player';

interface Props {
  html: string;
}

export default function RichContentRenderer({ html }: Props) {
  const [safeHtml, setSafeHtml] = useState<string>('');

  useEffect(() => {
    // 클라이언트에서만 DOMPurify import
    import('dompurify').then((DOMPurify) => {
      setSafeHtml(DOMPurify.default.sanitize(html)); // ✅ 여기서 default로 접근!
    });
  }, [html]);
  const options: HTMLReactParserOptions = {
    replace: (node: DOMNode) => {
      // 유튜브 링크 감지해서 iframe으로 대체
      if (
        node instanceof Element &&
        node.name === 'a' &&
        node.attribs?.href &&
        ReactPlayer.canPlay(node.attribs.href)
      ) {
        const url = node.attribs.href;
        return (
          <div style={{ margin: '1rem 0' }}>
            <ReactPlayer url={url} width="100%" height={360} controls />
          </div>
        );
      }

      // 이미지 alt 누락 시 기본값
      if (node instanceof Element && node.name === 'img') {
        if (!node.attribs.alt) {
          node.attribs.alt = '이미지';
        }
      }

      return undefined; // 나머지는 그대로 처리
    },
  };

  return <div>{parse(safeHtml, options)}</div>;
}
