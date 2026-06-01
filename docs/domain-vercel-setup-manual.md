# Vercel + Custom Domain Setup Manual

샘플 기준:

- GitHub account: `sample-company`
- GitHub repository: `sample-company/example-site`
- Vercel project: `example-site`
- Domain: `example.jp`
- Main URL: `https://example.jp`
- Redirect URL: `https://www.example.jp` -> `https://example.jp`

이 문서는 Vercel에 올린 사이트를 외부 도메인 구매처에서 산 도메인과 연결하는 절차를 정리한 것이다.

## 1. 전체 흐름

1. GitHub에 사이트 저장소를 만든다.
2. 로컬 사이트 파일을 GitHub에 push한다.
3. Vercel에서 GitHub 저장소를 import한다.
4. Vercel에서 임시 주소가 정상 작동하는지 확인한다.
5. Vercel 프로젝트에 커스텀 도메인을 추가한다.
6. 도메인 구매처 DNS 화면에서 Vercel이 요구한 DNS 레코드를 넣는다.
7. Vercel Domains 화면에서 `Valid Configuration` 상태를 확인한다.

## 2. GitHub 저장소 준비

GitHub에서 새 repository를 만든다.

권장 설정:

```text
Repository name: example-site
Visibility: Public 또는 Private
Add README: Off
Add .gitignore: No .gitignore
Add license: No license
```

로컬 프로젝트 폴더에서 실행:

```powershell
cd C:\path\to\example-site

git init
git config user.name "sample-company"
git config user.email "sample@example.com"

git add .
git commit -m "Initial site"
git branch -M main
git remote add origin https://github.com/sample-company/example-site.git
git push -u origin main
```

이미 remote가 있다면:

```powershell
git remote set-url origin https://github.com/sample-company/example-site.git
git push -u origin main
```

## 3. Vercel 프로젝트 생성

Vercel Dashboard에서:

```text
Add New...
Project
Import Git Repository
```

GitHub 저장소 `sample-company/example-site`를 선택한다.

정적 HTML/CSS/JS 사이트라면 보통 아래처럼 설정한다.

```text
Framework Preset: Other
Install Command: npm install
Build Command: npm run build
Output Directory: public
```

현재처럼 빌드할 때 `public` 폴더를 생성하는 프로젝트라면 `Output Directory`는 `public`이 맞다.

Vercel 배포 후 아래 임시 주소가 정상 작동하는지 먼저 확인한다.

```text
https://example-site.vercel.app
```

## 4. Vercel에 도메인 추가

Vercel 프로젝트에서:

```text
Project
Settings
Domains
Add Existing
```

먼저 apex domain을 추가한다.

```text
example.jp
```

메인 주소를 `example.jp`로 쓸 경우:

```text
Redirect example.jp to www.example.jp
```

이 체크가 보이면 해제한다.

그 다음 `www` 도메인도 추가한다.

```text
www.example.jp
```

원하는 구조:

```text
example.jp       -> Production에 연결
www.example.jp   -> example.jp로 redirect
```

Vercel 화면에 DNS 값이 표시되면 반드시 그 값을 우선한다. 일반적으로는 아래와 같다.

```text
example.jp
Type: A
Value: 76.76.21.21
```

```text
www.example.jp
Type: CNAME
Value: cname.vercel-dns.com
```

또는 Vercel 화면에서 `cname.vercel-dns-0.com`처럼 다른 값이 나올 수 있다. 그 경우 Vercel 화면의 값을 그대로 사용한다.

## 5. DNS를 어디서 수정해야 하는지 확인

중요한 원칙:

도메인을 산 곳과 DNS를 관리하는 곳이 다를 수 있다.

예를 들어 도메인을 무무도메인에서 샀더라도, 네임서버가 Cloudflare로 되어 있으면 DNS 레코드는 Cloudflare에서 수정해야 한다.

확인할 것:

```text
Nameserver / ネームサーバー
DNS management / DNS管理
DNS records / DNSレコード
```

기존에 같은 이름의 레코드가 있으면 충돌할 수 있다.

보통 제거하거나 수정해야 하는 대상:

```text
@ 또는 빈칸 A 레코드
www CNAME 레코드
www A 레코드
```

메일을 쓰고 있다면 아래는 함부로 삭제하지 않는다.

```text
MX
TXT
SPF
DKIM
DMARC
```

## 6. 무무도메인에서 연결하는 법

무무도메인 관리화면에서:

```text
ドメイン操作
ムームーDNS
example.jp 오른쪽의 変更 또는 利用する
```

처음 들어가면 아래 버튼을 누른다.

```text
カスタム設定
```

그 다음:

```text
設定2へ進む
設定を追加する
```

아래 2개 레코드를 추가한다.

```text
サブドメイン: 빈칸
種別: A
内容: 76.76.21.21
優先度: 빈칸
```

```text
サブドメイン: www
種別: CNAME
内容: cname.vercel-dns.com
優先度: 빈칸
```

입력 후:

```text
設定を追加
OK
```

무무도메인 공식 안내 기준으로 DNS 레코드 반영은 보통 약 1시간 정도 걸릴 수 있다. 네임서버 자체를 바꾼 경우에는 더 오래 걸릴 수 있다.

## 7. Cloudflare에서 연결하는 법

Cloudflare Dashboard에서:

```text
Websites
대상 도메인 선택
DNS
Records
Add record
```

레코드 1:

```text
Type: A
Name: @
IPv4 address: 76.76.21.21
Proxy status: DNS only 권장
TTL: Auto
```

레코드 2:

```text
Type: CNAME
Name: www
Target: cname.vercel-dns.com
Proxy status: DNS only 권장
TTL: Auto
```

처음 연결할 때는 `DNS only`로 검증을 통과시키는 편이 덜 헷갈린다. 이후 필요한 경우에만 프록시 설정을 검토한다.

## 8. GoDaddy에서 연결하는 법

GoDaddy에서:

```text
Domain Portfolio
대상 도메인 선택
DNS
Manage DNS
Records
Add 또는 Edit
```

레코드 1:

```text
Type: A
Name: @
Value: 76.76.21.21
TTL: Default
```

레코드 2:

```text
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: Default
```

기존 `www` 레코드가 있으면 새로 추가하지 말고 기존 값을 수정한다.

## 9. Namecheap에서 연결하는 법

Namecheap에서:

```text
Domain List
Manage
Advanced DNS
Host Records
Add New Record
```

레코드 1:

```text
Type: A Record
Host: @
Value: 76.76.21.21
TTL: Automatic
```

레코드 2:

```text
Type: CNAME Record
Host: www
Value: cname.vercel-dns.com
TTL: Automatic
```

## 10. お名前.com에서 연결하는 법

お名前.com에서는 메뉴명이 조금씩 달라질 수 있지만 대체로 아래 흐름이다.

```text
ドメイン
DNS設定 / DNS関連機能
DNSレコード設定
対象ドメイン 선택
DNSレコード追加
```

레코드 1:

```text
ホスト名: 빈칸 또는 @
TYPE: A
VALUE: 76.76.21.21
```

레코드 2:

```text
ホスト名: www
TYPE: CNAME
VALUE: cname.vercel-dns.com
```

## 11. Squarespace Domains / Google Domains 이전 계정

Google Domains는 Squarespace Domains로 이전된 경우가 많다.

Squarespace에서:

```text
Domains
대상 도메인
DNS
Custom Records
Add record
```

레코드 1:

```text
Type: A
Host: @
Data / Value: 76.76.21.21
```

레코드 2:

```text
Type: CNAME
Host: www
Data / Value: cname.vercel-dns.com
```

## 12. AWS Route 53에서 연결하는 법

Route 53에서:

```text
Hosted zones
example.jp
Create record
```

레코드 1:

```text
Record name: 빈칸
Record type: A
Value: 76.76.21.21
```

레코드 2:

```text
Record name: www
Record type: CNAME
Value: cname.vercel-dns.com
```

## 13. 확인 방법

Vercel에서:

```text
Project
Settings
Domains
```

성공 상태:

```text
Valid Configuration
```

터미널 확인:

```powershell
nslookup example.jp
nslookup www.example.jp
curl -I https://example.jp
curl -I https://www.example.jp
```

정상 예시:

```text
HTTP/1.1 200 OK
Server: Vercel
```

또는 redirect를 설정했다면:

```text
HTTP/1.1 307 Temporary Redirect
Location: https://example.jp/
```

## 14. 자주 나는 문제

### Vercel에서 Invalid Configuration이 뜬다

확인할 것:

- DNS 값을 Vercel 화면 그대로 넣었는가
- apex domain에는 A 레코드를 넣었는가
- `www`에는 CNAME 레코드를 넣었는가
- 기존 `www` A 레코드 또는 CNAME 레코드와 충돌하지 않는가
- DNS 관리처가 실제로 현재 화면이 맞는가

### `example.jp`는 되는데 `www.example.jp`가 안 된다

`www` CNAME 레코드가 없거나 잘못된 것이다.

### `www.example.jp`는 되는데 `example.jp`가 안 된다

apex domain의 A 레코드가 없거나 잘못된 것이다.

### Vercel build가 `No Output Directory named "public"`으로 실패한다

Vercel의 Output Directory와 프로젝트 build 결과가 맞지 않는 것이다.

해결 예시:

```text
Output Directory: public
```

그리고 build script가 `public` 폴더를 만들도록 한다.

또는 순수 정적 루트 배포라면:

```text
Output Directory: .
```

프로젝트 구조에 맞춰 하나만 선택한다.

### 다른 계정 이름이 Vercel에 보인다

확인할 것:

- Vercel에 로그인한 계정
- GitHub 연결 계정
- Git commit author

로컬 저장소에서 작성자 지정:

```powershell
git config user.name "sample-company"
git config user.email "sample@example.com"
```

이미 잘못된 작성자로 첫 커밋을 올렸고 새 프로젝트라 히스토리를 깨끗하게 만들고 싶다면, 별도 백업 후 새 단일 커밋으로 force push할 수 있다.

```powershell
git push --force-with-lease origin main
```

운영 중인 저장소에서는 force push 전에 반드시 확인한다.

## 15. 최종 체크리스트

- [ ] GitHub repository가 올바른 계정에 있다.
- [ ] Vercel project가 올바른 Vercel 계정에 있다.
- [ ] Vercel 임시 주소가 정상 작동한다.
- [ ] Vercel Domains에 apex domain을 추가했다.
- [ ] Vercel Domains에 `www` domain을 추가했다.
- [ ] DNS 관리처에서 apex A record를 설정했다.
- [ ] DNS 관리처에서 `www` CNAME record를 설정했다.
- [ ] 기존 충돌 레코드를 제거/수정했다.
- [ ] Vercel에서 `Valid Configuration`이 떴다.
- [ ] `https://example.jp` 접속이 된다.
- [ ] `https://www.example.jp` 접속 또는 redirect가 된다.

## 16. 참고 공식 문서

- Vercel custom domain setup: https://vercel.com/docs/domains/set-up-custom-domain
- Vercel add domain overview: https://vercel.com/docs/concepts/projects/domains/add-a-domain
- Vercel DNS CLI: https://vercel.com/docs/cli/dns
- Muumuu Domain custom DNS: https://support.muumuu-domain.com/hc/ja/articles/360046453854-%E3%83%A0%E3%83%BC%E3%83%A0%E3%83%BCDNS%E3%82%AB%E3%82%B9%E3%82%BF%E3%83%A0%E8%A8%AD%E5%AE%9A
- Muumuu Domain DNS records: https://support.muumuu-domain.com/hc/ja/articles/360045802434-DNS%E3%83%AC%E3%82%B3%E3%83%BC%E3%83%89%E3%82%92%E8%A8%AD%E5%AE%9A%E3%81%99%E3%82%8B%E3%81%93%E3%81%A8%E3%81%AF%E3%81%A7%E3%81%8D%E3%81%BE%E3%81%99%E3%81%8B
- Cloudflare DNS records: https://developers.cloudflare.com/dns/manage-dns-records/
- Cloudflare create DNS records: https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-dns-records/
- Namecheap DNS records overview: https://www.namecheap.com/support/knowledgebase/article.aspx/579
