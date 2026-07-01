// 도입 문의 연락처 SSOT — 헤더 팝오버와 CTA 인라인 안내가 공유한다.

export const CONTACT_EMAIL = 'optic.devs@gmail.com'

export const CONTACT_MAILTO_SUBJECT = '[OPTIC 도입 문의]'

export const CONTACT_MAILTO_BODY = `안녕하세요, OPTIC 도입을 문의합니다.

· 회사명:
· 담당자 / 연락처:
· 월 오더·배차 규모:
· 현재 사용 중인 툴:
· 도입 희망 시기:

문의 내용:
`

/**
 * 제목·본문이 채워진 mailto 링크를 생성한다.
 * mailto는 RFC 6068 규격상 공백을 %20으로 인코딩해야 하므로 encodeURIComponent를 사용한다.
 */
export function buildContactMailto(): string {
  const subject = encodeURIComponent(CONTACT_MAILTO_SUBJECT)
  const body = encodeURIComponent(CONTACT_MAILTO_BODY)
  return `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`
}

export const CONTACT_GUIDE_TEXT =
  '회사명 · 월 오더/배차 규모 · 현재 사용 툴 · 도입 희망 시기를 함께 적어주세요.'
