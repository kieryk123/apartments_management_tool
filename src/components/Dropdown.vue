<template>
    <div @click="visible = !visible" class="table-dropdown">
        <div v-if="visible" class="table-dropdown__menu">
            <template v-for="item in menuItems">
                <a
                    v-if="item.strong"
                    :key="item.index"
                    @click="item.action"
                    class="table-dropdown__menu-link table-dropdown__menu-link--strong-color"
                >{{ item.title }}</a>
                <a
                    v-else
                    :key="item.index"
                    @click="item.action"
                    class="table-dropdown__menu-link"
                >{{ item.title }}</a>
            </template>
        </div>
    </div>
</template>

<script>
export default {
    created () {
        document.addEventListener('click', this.documentClick);
    },
    destroyed() {
        window.removeEventListener('click', this.documentClick);
    },
    props: [
        'menuItems'
    ],
    data: () => ({
        visible: false
    }),
    methods: {
        documentClick(e) {
            const el = this.$el;
            const target = e.target;

            if (el != target) {
                this.visible = false;
            }
        }
    }
}
</script>

<style lang="scss">
.table-dropdown {
    position: relative;
    background-size: 100% 100%;
    height: 28px;
    width: 28px;
    background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgdmlld0JveD0iMCAwIDQwOCA0MDgiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDQwOCA0MDg7IiB4bWw6c3BhY2U9InByZXNlcnZlIj48ZyB0cmFuc2Zvcm09Im1hdHJpeCgwLjkyMjc0NSAwIDAgMC45MjI3NDUgMTUuNzYwMSAxNS43NjAxKSI+PGc+Cgk8ZyBpZD0ibW9yZS1ob3JpeiI+CgkJPHBhdGggZD0iTTUxLDE1M2MtMjguMDUsMC01MSwyMi45NS01MSw1MXMyMi45NSw1MSw1MSw1MXM1MS0yMi45NSw1MS01MVM3OS4wNSwxNTMsNTEsMTUzeiBNMzU3LDE1M2MtMjguMDUsMC01MSwyMi45NS01MSw1MSAgICBzMjIuOTUsNTEsNTEsNTFzNTEtMjIuOTUsNTEtNTFTMzg1LjA1LDE1MywzNTcsMTUzeiBNMjA0LDE1M2MtMjguMDUsMC01MSwyMi45NS01MSw1MXMyMi45NSw1MSw1MSw1MXM1MS0yMi45NSw1MS01MSAgICBTMjMyLjA1LDE1MywyMDQsMTUzeiIgZGF0YS1vcmlnaW5hbD0iIzAwMDAwMCIgY2xhc3M9ImFjdGl2ZS1wYXRoIiBzdHlsZT0iZmlsbDojOEY5Q0FGIiBkYXRhLW9sZF9jb2xvcj0iIzhmOWNhZiI+PC9wYXRoPgoJPC9nPgo8L2c+PC9nPiA8L3N2Zz4=);
    border: 0;
    outline: 0;
    box-shadow: none;
    background-color: transparent;

    &:hover {
        cursor: pointer;
    }

    &__menu {
        display: block;
        position: absolute;
        z-index: 1;
        bottom: -75px;
        right: -4px;
        min-width: 155px;
        background-color: white;
        border-radius: 8px;
        padding: 10px;
        box-shadow: 0 0 40px -10px rgba(30,41,69,.2), 0 1px 2px 0 rgba(30,41,69,.1), 0 0 12px 0 rgba(30,41,69,.1);
    }

    &__menu-link {
        display: inline-block;
        font-size: 14px;
        text-decoration: none;
        width: 100%;
        padding: 3px 5px;
        border-bottom: 1px solid #e5e9f2;
        color: #1c2d41;

        &:last-child {
            border: 0;
        }

        &--strong-color {
            color: #EB344F;
        }
    }
}
</style>
