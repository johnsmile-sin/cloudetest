// 공지사항 데이터 관리
class AnnouncementBoard {
    constructor() {
        this.storageKey = 'announcements';
        this.announcements = this.loadAnnouncements();
        this.currentId = null;
        this.init();
    }

    // 초기화
    init() {
        this.renderList();
        this.bindEvents();
    }

    // LocalStorage에서 공지사항 불러오기
    loadAnnouncements() {
        const data = localStorage.getItem(this.storageKey);
        return data ? JSON.parse(data) : this.getDefaultAnnouncements();
    }

    // 기본 샘플 공지사항
    getDefaultAnnouncements() {
        return [
            {
                id: 1,
                title: '공지사항 게시판이 오픈되었습니다!',
                author: '관리자',
                content: '안녕하세요.\n\n공지사항 게시판이 새롭게 오픈되었습니다.\n\n중요한 소식과 업데이트 내용을 이곳에서 확인하실 수 있습니다.\n\n많은 관심 부탁드립니다.',
                date: this.formatDate(new Date()),
                views: 10
            },
            {
                id: 2,
                title: '이용 안내 및 규칙',
                author: '관리자',
                content: '게시판 이용 안내입니다.\n\n1. 게시글은 누구나 작성할 수 있습니다.\n2. 부적절한 내용은 삭제될 수 있습니다.\n3. 서로 존중하는 커뮤니티를 만들어 주세요.',
                date: this.formatDate(new Date()),
                views: 5
            }
        ];
    }

    // LocalStorage에 저장
    saveAnnouncements() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.announcements));
    }

    // 날짜 포맷팅
    formatDate(date) {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    // 새 ID 생성
    generateId() {
        return this.announcements.length > 0
            ? Math.max(...this.announcements.map(a => a.id)) + 1
            : 1;
    }

    // 공지사항 추가
    addAnnouncement(title, author, content) {
        const announcement = {
            id: this.generateId(),
            title,
            author,
            content,
            date: this.formatDate(new Date()),
            views: 0
        };
        this.announcements.unshift(announcement);
        this.saveAnnouncements();
        this.renderList();
    }

    // 공지사항 삭제
    deleteAnnouncement(id) {
        this.announcements = this.announcements.filter(a => a.id !== id);
        this.saveAnnouncements();
        this.renderList();
    }

    // 조회수 증가
    incrementViews(id) {
        const announcement = this.announcements.find(a => a.id === id);
        if (announcement) {
            announcement.views++;
            this.saveAnnouncements();
        }
    }

    // 공지사항 조회
    getAnnouncement(id) {
        return this.announcements.find(a => a.id === id);
    }

    // 목록 렌더링
    renderList() {
        const tbody = document.getElementById('announcementList');

        if (this.announcements.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="5" class="empty-message">
                        등록된 공지사항이 없습니다.
                    </td>
                </tr>
            `;
            return;
        }

        tbody.innerHTML = this.announcements.map((item, index) => `
            <tr data-id="${item.id}">
                <td>${this.announcements.length - index}</td>
                <td class="col-title">${this.escapeHtml(item.title)}</td>
                <td>${this.escapeHtml(item.author)}</td>
                <td>${item.date}</td>
                <td>${item.views}</td>
            </tr>
        `).join('');
    }

    // XSS 방지를 위한 HTML 이스케이프
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // 이벤트 바인딩
    bindEvents() {
        // 폼 제출
        document.getElementById('announcementForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const title = document.getElementById('title').value.trim();
            const author = document.getElementById('author').value.trim();
            const content = document.getElementById('content').value.trim();

            if (title && author && content) {
                this.addAnnouncement(title, author, content);
                e.target.reset();
                toggleWriteSection();
            }
        });

        // 목록 클릭 (이벤트 위임)
        document.getElementById('announcementList').addEventListener('click', (e) => {
            const row = e.target.closest('tr');
            if (row && row.dataset.id) {
                const id = parseInt(row.dataset.id);
                this.showDetail(id);
            }
        });

        // 삭제 버튼
        document.getElementById('deleteBtn').addEventListener('click', () => {
            if (this.currentId && confirm('정말 삭제하시겠습니까?')) {
                this.deleteAnnouncement(this.currentId);
                closeModal();
            }
        });

        // 모달 외부 클릭 시 닫기
        document.getElementById('detailModal').addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                closeModal();
            }
        });

        // ESC 키로 모달 닫기
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeModal();
            }
        });
    }

    // 상세보기 표시
    showDetail(id) {
        const announcement = this.getAnnouncement(id);
        if (!announcement) return;

        this.currentId = id;
        this.incrementViews(id);
        this.renderList();

        document.getElementById('modalTitle').textContent = announcement.title;
        document.getElementById('modalAuthor').textContent = `작성자: ${announcement.author}`;
        document.getElementById('modalDate').textContent = `작성일: ${announcement.date}`;
        document.getElementById('modalViews').textContent = `조회수: ${announcement.views}`;
        document.getElementById('modalContent').textContent = announcement.content;

        document.getElementById('detailModal').classList.add('active');
    }
}

// 글쓰기 섹션 토글
function toggleWriteSection() {
    const section = document.getElementById('writeSection');
    section.classList.toggle('active');
    if (section.classList.contains('active')) {
        document.getElementById('title').focus();
    }
}

// 모달 닫기
function closeModal() {
    document.getElementById('detailModal').classList.remove('active');
}

// 앱 초기화
const board = new AnnouncementBoard();
