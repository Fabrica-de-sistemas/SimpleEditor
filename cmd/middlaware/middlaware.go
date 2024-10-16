package middlaware

import "net/http"

type Middlaware func(http.Handler) http.Handler

func CreateStack(mids ...Middlaware) Middlaware {
	return func(root http.Handler) http.Handler {
		for i := len(mids) - 1; i >= 0; i-- {
			root = mids[i](root)
		}
		return root
	}
}
